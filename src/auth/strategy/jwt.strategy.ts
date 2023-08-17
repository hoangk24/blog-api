import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { UserWithoutPrivateFields } from '@/model/user';
import { UsersService } from '@/users/users.service';
import { User } from '@/users/entities/user.entity';

type ValidatePayload = {
  id: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(readonly userService: UsersService, configs: ConfigService) {
    super({
      ignoreExpiration: false,
      secretOrKey: configs.get('auth.secret'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
    });
  }

  async validate(payload: any): Promise<ValidatePayload> {
    const user = await this.userService.findOne({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return User.removePrivateField(user);
  }
}
