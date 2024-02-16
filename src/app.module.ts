//Library
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Configs
import appConfig from '@/configs/app.config';
import authConfig from '@/configs/auth.config';
import cloudinaryConfig from '@/configs/cloudinary.config';

//Modules
import { UsersModule } from '@/modules/user/user.module';
import { CloudinaryModule } from '@/modules/cloudinary/cloudinary.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { MediaModule } from '@/modules/media/mediaAdmin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, cloudinaryConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      async useFactory(configService: ConfigService) {
        return {
          type: 'mysql',
          url: configService.get('app.databaseUri'),
          entities: [__dirname + '*/entities/**/*.entity.ts'],
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
    NestjsFormDataModule.config({
      isGlobal: true,
      autoDeleteFile: true,
      storage: FileSystemStoredFile,
    }),
    UsersModule,
    AuthModule,
    CloudinaryModule,
    MediaModule,
  ],
})
export class AppModule {}
