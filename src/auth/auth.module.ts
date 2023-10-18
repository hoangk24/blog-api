import { UsersModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthAdminController } from './admin/authAdmin.controller';
import { AuthAdminService } from './admin/authAdmin.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategyPrivate } from './strategy/jwt.private';
import { JwtStrategyPublic } from './strategy/jwt.public';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('auth.secret'),
        };
      },
    }),
  ],
  controllers: [AuthController, AuthAdminController],
  providers: [
    AuthService,
    AuthAdminService,
    JwtStrategyPrivate,
    JwtStrategyPublic,
  ],
})
export class AuthModule {}
