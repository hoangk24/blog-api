import { FileService } from '@/file/file.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { Post } from './entities/post.entity';
import { Tag } from './entities/tag.entity';
import { ErrorHandler } from '@/core/error.service';

@Injectable()
export class PostAdminService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Post)
    private tagRepository: Repository<Tag>,
    private fileService: FileService,
  ) {}

  async getPosts(params: IPaginationOptions) {
    return paginate(this.postRepository.createQueryBuilder(), params);
  }

  async getPost(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  async create(payload: CreatePostDto) {
    if (payload.posterId) {
      const poster = await this.fileService.get(payload.posterId);
      if (!poster) {
        ErrorHandler.throwNotFoundException('poster not found');
      }
    }
    return this.postRepository.save(payload);
  }

  async createTag(payload: CreateTagDto) {
    return this.tagRepository.save(payload);
  }
}
