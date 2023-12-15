import { BaseService } from '@/core/base.service';
import { FileService } from '@/file/file.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private tagRepository: Repository<Tag>, // private fileService: FileService,
  ) {}

  async getPosts(params: IPaginationOptions) {
    return paginate(this.postRepository.createQueryBuilder(), params);
  }

  async create(payload: CreatePostDto) {
    if (payload.posterId) {
      // const poster = await this.fileService.get(payload.posterId);
      // if (!poster) {
      //   this.fileService.throwNotFoundException('poster not found');
      // }
    }
    return this.postRepository.save(payload);
  }

  async createTag(payload: CreateTagDto) {
    return this.tagRepository.save(payload);
  }
}
