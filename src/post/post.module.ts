import { UsersModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { FileModule } from '@/file/file.module';
import { Tag } from './entities/tag.entity';
import { PostAdminController } from './postAdmin.controller';
import { PostAdminService } from './postAdmin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag]), FileModule],
  controllers: [PostController, PostAdminController],
  providers: [PostService, PostAdminService],
})
export class PostModule {}
