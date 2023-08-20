import { UsersService } from '@/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type ValidatePayload = {
  id: number;
};

@Injectable()
export class JwtStrategyPrivate extends PassportStrategy(Strategy, 'jwt') {
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

    return user;
  }
}
