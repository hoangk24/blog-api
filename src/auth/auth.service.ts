import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UserWithoutPrivateFields } from '@/model/user';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async getMe(id: number): Promise<UserWithoutPrivateFields> {
    const user = await this.userService.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not exits.');
    }

    return User.removePrivateField(user);
  }

  async create(createUser: CreateAuthDto): Promise<User> {
    return this.userService.create(createUser);
  }

  async login({
    password,
    username,
  }: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not exits.');
    }

    if (!User.comparePassword(password, user.password)) {
      throw new UnauthorizedException('username or password is invalid.');
    }

    return {
      accessToken: await this.jwtService.signAsync({
        sub: user.id,
        username: user.username,
      }),
    };
  }
}
