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

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Tag]),
    CloudinaryModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [
    //TODO: PostController
    PostAdminController,
    TagAdminController,
  ],
  providers: [PostService, PostAdminService, TagAdminService],
  exports: [PostService, PostAdminService],
})
export class PostModule {}
