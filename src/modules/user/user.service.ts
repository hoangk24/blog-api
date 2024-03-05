import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserRole } from '@/models/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(options: FindOneOptions<User>) {
    return this.userRepository.findOne(options);
  }

  async createUser(payload) {
    return this.userRepository.save({
      ...payload,
      role: UserRole.ADMIN,
    });
  }
}
