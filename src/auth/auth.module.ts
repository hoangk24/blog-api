import { UsersModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthAdminController } from './authAdmin.controller';
import { AuthAdminService } from './authAdmin.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

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
  controllers: [AuthAdminController],
  providers: [AuthAdminService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
