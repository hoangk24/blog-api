import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';
import httpStatus from 'http-status';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create({ password, ...rest }: CreateUserDto) {
    const userExits = await this.usersRepository.findOneBy({
      username: rest.username,
    });

    if (userExits) {
      throw new HttpException('username exited.', httpStatus.CONFLICT);
    }

    return this.usersRepository.save({
      ...rest,
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
