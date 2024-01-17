import { CloudinaryModule } from '@/cloudinary/cloudinary.module';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Tag } from './entities/tag.entity';
import { PostService } from './post.service';
import { PostAdminController } from './postAdmin.controller';
import { PostAdminService } from './postAdmin.service';
import { TagAdminController } from './tagAdmin.controller';
import { TagAdminService } from './tagAdmin.service';
import { UsersModule } from '@/user/user.module';
import { PostController } from './post.controller';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Tag]),
    CloudinaryModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [
    TagController,
    PostController,
    PostAdminController,
    TagAdminController,
  ],
  providers: [TagService, PostService, PostAdminService, TagAdminService],
  exports: [PostService, PostAdminService],
})
export class PostModule {}
