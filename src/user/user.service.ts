import { BaseService } from '@/core/base.service';
import { UserRole } from '@/model/user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(@InjectRepository(User) repo: Repository<User>) {
    super(repo);
  }

  //!-----------Start Core-----------

  async findOne(options: FindOneOptions<User>) {
    return this.repo.findOne(options);
  }

  async create(payload: CreateUserDto) {
    const { email, username } = payload;
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
      ...payload,
      role: UserRole.USER,
    });
  }
  //!-----------End core-----------
}
