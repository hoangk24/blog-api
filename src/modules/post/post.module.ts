import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UsersModule } from '@/modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { Tag } from './entities/tag.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag, Comment]), UsersModule],
  controllers: [PostController, TagController],
  providers: [PostService, TagService],
})
export class PostModule {}
