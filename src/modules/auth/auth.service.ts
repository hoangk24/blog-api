import { UserRole, UserWithoutPrivateFields } from '@/models/user';
import { User } from '@/modules/user/entities/user.entity';
import { UsersService } from '@/modules/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ErrorHandler } from '@/cores/error.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async login(user: User) {
    return this.generateJsonWebToken(user);
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
      ErrorHandler.throwUnauthorizedException('Email or password is invalid.');
    }

    if (!user.isActive) {
      ErrorHandler.throwForbiddenException('User is un-activated.');
    }

    if (user.role === UserRole.USER) {
      ErrorHandler.throwForbiddenException();
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
