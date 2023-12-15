import { UsersModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { FileModule } from '@/file/file.module';
import { Tag } from './entities/tag.entity';
import { FileService } from '@/file/file.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Post, Tag])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
