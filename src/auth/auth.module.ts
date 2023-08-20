import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthAdminService } from './admin/authAdmin.service';
import { AuthAdminController } from './admin/authAdmin.controller';

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
  providers: [AuthService, AuthAdminService, JwtStrategy],
})
export class AuthModule {}
