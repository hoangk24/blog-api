import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

type ValidatePayload = {
  id: number;
};

@Injectable()
export class JwtStrategyPublic extends PassportStrategy(
  Strategy,
  'jwt-public',
) {
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
    return {
      id: payload.id,
    };
  }
}
