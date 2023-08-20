import { UsersModule } from '@/users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostAdminController } from './admin/postAdmin.controller';
import { PostAdminService } from './admin/postAdmin.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Post])],
  controllers: [PostController, PostAdminController],
  providers: [PostService, PostAdminService],
})
export class PostModule {}
