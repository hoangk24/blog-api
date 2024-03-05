import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ErrorHandler } from '@/cores/error.service';
import { UserRole } from '@/models/user';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { omit } from 'lodash';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersAdminService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUsers(payload: IPaginationOptions) {
    return paginate(this.userRepository.createQueryBuilder('users'), payload);
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      ErrorHandler.throwNotFoundException(`user ${id}`);
    }

    return omit(user, 'password');
  }

  async findOne(options: FindOneOptions<User>) {
    return this.userRepository.findOne(options);
  }

  async create(payload: CreateUserDto) {
    const userExits = await this.userRepository.findOneBy({
      email: payload.email,
    });

    if (userExits) {
      ErrorHandler.throwErrorFieldException('email', 'Email has been used.');
    }

    return this.userRepository.save({
      ...payload,
      role: UserRole.USER,
    });
  }

  async deactivateUser(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user.role === UserRole.ADMIN) {
      ErrorHandler.throwBadRequestException('userRole is ADMIN');
    }

    return this.userRepository.save({ ...user, isActive: !user.isActive });
  }

  async update(userId: number, payload: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      ErrorHandler.throwNotFoundException('user');
    }

    await this.userRepository.save({ ...user, ...payload });
  }
}
