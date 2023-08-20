import { BaseService } from '@/core/base.service';
import { UserRole } from '@/model/user';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo);
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
