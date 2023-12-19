import { UsersModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

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
  // controllers: [AuthController, AuthAdminController],
  // providers: [
  //   AuthService,
  //   AuthAdminService,
  //   JwtStrategyPrivate,
  //   JwtStrategyPublic,
  // ],
})
export class AuthModule {}
