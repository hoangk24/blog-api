import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthAdminService } from '../authAdmin.service';
import { UserWithoutPrivateFields } from '@/models/user';
import { ErrorHandler } from '@/cores/error.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthAdminService) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<UserWithoutPrivateFields> {
    const user = await this.authService.validateUserCredentials({
      email,
      password,
    });

    if (!user) {
      ErrorHandler.throwNotFoundException('user');
    }

    return user;
  }
}
