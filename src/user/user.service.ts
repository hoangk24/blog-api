import { ErrorHandler } from '@/core/error.service';
import { UserRole } from '@/model/user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  queryBuilder() {
    return this.userRepository.createQueryBuilder('user');
  }

  async findOne(options: FindOneOptions<User>) {
    return this.userRepository.findOne(options);
  }

  async create(payload: CreateUserDto) {
    const { email, username } = payload;
    const userExits = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email })
      .getOne();
    if (userExits) {
      if (userExits.username === username) {
        ErrorHandler.throwErrorFieldException(
          'username',
          'Username has been used.',
        );
      }
      if (userExits.email === email) {
        ErrorHandler.throwErrorFieldException('email', 'Email has been used.');
      }
    }
    return this.userRepository.save({
      ...payload,
      role: UserRole.USER,
    });
  }
}
