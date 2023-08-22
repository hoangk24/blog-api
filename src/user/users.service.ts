import { BaseService } from '@/core/base.service';
import { UserRole } from '@/model/user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo);
  }

  async getProfile(id: number, userId?: number) {
    const profile = await this.repo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.friendRequests', 'friendRequests')
      .where('user.id = :id', { id })

      .getOne();

    console.log(profile);

    if (!profile) {
      this.throwNotFoundException('user not found');
    }

    let status: string;
    if (userId) {
      const user = await this.repo.findOne({
        where: {
          id: userId,
        },
        relations: ['friends'],
      });

      if (user.friends.some((friend) => friend.id === id)) {
        status = 'yourFriend'; // Bạn bè
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
    const user = await this.repo.findOne({
      where: {
        id: userId,
      },
      relations: ['friends'],
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

    const me = await this.repo.findOne({
      where: {
        id: userId,
      },
      relations: ['friends', 'friendRequests'],
    });
    me.friends.filter((item) => item.id === friendId);

    return this.repo.save(me);
  }

  async cancelAddFriend(userId: number, friendId: number) {
    const friend = await this.repo.findOne({
      where: {
        id: friendId,
      },
      relations: ['friends', 'friendRequests'],
    });

    if (!friend) {
      this.throwNotFoundException('Not found your friend.');
    }

    const me = await this.repo.findOne({
      where: {
        id: userId,
      },
      relations: ['friends', 'friendRequests'],
    });
    me.friendRequests.filter((item) => item.id === friendId);

    return this.repo.save(me);
  }

  async addFriend(userId: number, friendId: number) {
    const friend = await this.repo.findOne({
      where: {
        id: friendId,
      },
      relations: ['friends', 'friendRequests'],
    });

    if (!friend) {
      this.throwNotFoundException('Not found your friend.');
    }

    const me = await this.repo.findOne({
      where: {
        id: userId,
      },
      relations: ['friends', 'friendRequests'],
    });

    me.friendRequests.push(friend);

    return this.repo.save(me);
  }

  async acceptFriend(userId: number, friendId: number) {
    const friend = await this.repo.findOne({
      where: {
        id: friendId,
      },
      relations: ['friends', 'friendRequests'],
    });

    if (!friend) {
      this.throwNotFoundException('Not found your friend.');
    }

    const me = await this.repo.findOne({
      where: {
        id: userId,
      },
      relations: ['friends', 'friendRequests'],
    });

    me.friends.push(friend);
    me.friendRequests.filter((item) => item.id === friendId);

    return this.repo.save(me);
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
      roles: [UserRole.USER],
      password: await hash(password, 10),
    });
  }
}
