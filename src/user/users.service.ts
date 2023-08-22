import { BaseService } from '@/core/base.service';
import { UserRole } from '@/model/user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }

  //!-----------Start Core-----------

  async findOne(options: FindOneOptions<User>) {
    return this.repo.findOne({
      ...options,
      relations: ['friendRequests', 'friends'],
    });
  }

  async create({ password, ...rest }: CreateUserDto) {
    const { email, username } = rest;
    const userExits = await this.repo
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email })
      .getOne();

    if (userExits) {
      if (userExits.username === username) {
        this.throwErrorFieldException('username', 'Username has been used.');
      }

      if (userExits.email === email) {
        this.throwErrorFieldException('email', 'Email has been used.');
      }
    }

    return this.repo.save({
      ...rest,
      role: UserRole.USER,
      password: await hash(password, 10),
    });
  }
  //!-----------End core-----------

  //! -----------Start Feature-----------

  async getProfile(friendId: number, userId?: number) {
    const profile = await this.findOne({
      where: {
        id: friendId,
      },
    });

    if (!profile) {
      this.throwNotFoundException('user not found');
    }

    let status: string;
    if (userId) {
      const user = await this.findOne({
        where: {
          id: userId,
        },
      });

      if (user.friends.some((friend) => friend.id === friendId)) {
        status = 'yourFriend';
      } else if (
        profile.friendRequests.some((request) => request.id === userId)
      ) {
        status = 'waitingForApproved';
      } else {
        status = 'notYourFriend';
      }
    }

    return {
      ...User.removePrivateField(profile),
      relationship: status,
    };
  }

  async getMyFriends(userId: number) {
    const user = await this.findOne({
      where: {
        id: userId,
      },
    });

    return user.friends;
  }

  async updateUser(userId: number, payload: UpdateUserDto) {
    return this.repo.save({
      id: userId,
      ...payload,
    });
  }

  async unFriend(userId: number, friendId: number) {
    const friend = await this.repo.findOne({
      where: {
        id: friendId,
      },
    });

    if (!friend) {
      this.throwNotFoundException('Not found your friend.');
    }

    const me = await this.findOne({
      where: {
        id: userId,
      },
    });

    me.friends.filter((item) => item.id === friendId);

    return this.repo.save(me);
  }

  async cancelAddFriend(userId: number, friendId: number) {
    const friend = await this.findOne({
      where: {
        id: friendId,
      },
    });

    if (!friend) {
      this.throwNotFoundException('Not found your friend.');
    }

    const me = await this.findOne({
      where: {
        id: userId,
      },
    });

    me.friendRequests.filter((item) => item.id === friendId);

    return this.repo.save(me);
  }

  async addFriend(userId: number, friendId: number) {
    const friend = await this.findOne({
      where: {
        id: friendId,
      },
    });

    if (!friend) {
      this.throwNotFoundException('Not found your friend.');
    }

    const me = await this.findOne({
      where: {
        id: userId,
      },
    });

    me.friendRequests.push(friend);

    return this.repo.save(me);
  }

  async acceptFriend(userId: number, friendId: number) {
    const friend = await this.findOne({
      where: {
        id: friendId,
      },
    });

    if (!friend) {
      this.throwNotFoundException('Not found your friend.');
    }

    const me = await this.findOne({
      where: {
        id: userId,
      },
    });

    me.friends.push(friend);
    me.friendRequests.filter((item) => item.id === friendId);

    return this.repo.save(me);
  }

  //!-----------End Feature-----------
}
