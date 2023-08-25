import { UsersModule } from '@/user/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostAdminController } from './postAdmin.controller';
import { FileModule } from '@/file/file.module';

@Module({
  imports: [FileModule, UsersModule, TypeOrmModule.forFeature([Post])],
  controllers: [PostController, PostAdminController],
  providers: [PostService],
})
export class PostModule {}
