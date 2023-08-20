import { ValidationError } from '@/errors/ValidationError';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from '@/model/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create({ password, ...rest }: CreateUserDto) {
    const { email, username } = rest;

    const userExits = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .orWhere('user.email = :email', { email })
      .getOne();

    if (userExits) {
      if (userExits.username === username) {
        throw new ValidationError('username', 'Username has been used.');
      }

      if (userExits.email === email) {
        throw new ValidationError('email', 'Email has been used.');
      }
    }

    return this.usersRepository.save({
      ...rest,
      roles: [UserRole.USER],
      password: await hash(password, 10),
    });
  }

  async getMe(id: number) {
    return this.usersRepository.findBy({ id });
  }

  async findOne(options: FindOneOptions<User>): Promise<User> {
    return await this.usersRepository.findOne(options);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
