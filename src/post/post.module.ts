import { CloudinaryModule } from '@/cloudinary/cloudinary.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Tag } from './entities/tag.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostAdminController } from './postAdmin.controller';
import { PostAdminService } from './postAdmin.service';
import { TagAdminController } from './tagAdmin.controller';
import { TagAdminService } from './tagAdmin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag]), CloudinaryModule],
  controllers: [PostController, PostAdminController, TagAdminController],
  providers: [PostService, PostAdminService, TagAdminService],
})
export class PostModule {}
