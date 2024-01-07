import { UserWithoutPrivateFields } from '@/model/user';
import { User } from '@/user/entities/user.entity';
import { UsersService } from '@/user/user.service';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ErrorHandler } from '@/core/error.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async login(user: User) {
    return this.generateJsonWebToken(user);
  }

  async create(createUser: RegisterDto) {
    const user = await this.userService.create(createUser);
    return User.removePrivateField(user);
  }

  async validateUserCredentials({
    username,
    password,
  }: LoginDto): Promise<UserWithoutPrivateFields> {
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

    if (!user.isActive) throw new ForbiddenException('user is un-activated.');

    return User.removePrivateField(user);
  }

  generateJsonWebToken(user: UserWithoutPrivateFields): string {
    return this.jwtService.sign({
      id: user.id,
    });
  }

  async getMe(userId: number) {
    const user = await this.userService.findOne({ where: { id: userId } });
    if (!user) {
      ErrorHandler.throwNotFoundException('user not found.');
    }
    return User.removePrivateField(user);
  }
}
