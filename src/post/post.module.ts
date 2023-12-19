import { UsersModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Tag } from './entities/tag.entity';
import { PostAdminController } from './postAdmin.controller';
import { PostAdminService } from './postAdmin.service';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { CloudinaryModule } from '@/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Tag]), CloudinaryModule],
  controllers: [PostController, PostAdminController],
  providers: [PostService, PostAdminService],
})
export class PostModule {}
