import { UserWithoutPrivateFields } from '@/models/user';
import { User } from '@/user/entities/user.entity';
import { UsersService } from '@/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ErrorHandler } from '@/cores/error.service';

@Injectable()
export class AuthAdminService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async login(user: User) {
    return this.generateJsonWebToken(user);
  }

  async register(createUser: RegisterDto) {
    const user = await this.userService.create(createUser);
    return User.removePrivateField(user);
  }

  async validateUserCredentials({
    email,
    password,
  }: LoginDto): Promise<UserWithoutPrivateFields> {
    const user = await this.userService.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      ErrorHandler.throwUnauthorizedException('User not exits.');
    }

    if (!User.comparePassword(password, user.password)) {
      ErrorHandler.throwUnauthorizedException(
        'username or password is invalid.',
      );
    }

    if (!user.isActive) {
      ErrorHandler.throwForbiddenException('user is un-activated.');
    }

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