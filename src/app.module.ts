//Library
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Default
import { AppService } from '@/app.service';
import { AppController } from '@/app.controller';

//Configs
import appConfig from '@/config/app.config';
import authConfig from '@/config/auth.config';
import cloudinaryConfig from '@/config/cloudinary.config';

//Modules
import { UsersModule } from '@/user/user.module';
import { CloudinaryModule } from '@/cloudinary/cloudinary.module';
import { AuthModule } from '@/auth/auth.module';
import { PostModule } from '@/post/post.module';
import { MediaModule } from '@/media/mediaAdmin.module';

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
    PostModule,
    CloudinaryModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
