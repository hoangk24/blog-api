import { UsersModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import appConfig from '@/config/app.config';
import authConfig from '@/config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig],
      envFilePath: ['.env.development'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
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
    UsersModule,
    AuthModule,
    PostModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
