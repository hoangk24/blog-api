import { ErrorHandler } from '@/core/error.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { TagAdminService } from './tagAdmin.service';

@Injectable()
export class PostAdminService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private tagService: TagAdminService,
  ) {}

  async getPosts(params: IPaginationOptions) {
    return paginate(
      this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.tags', 'tags')
        .orderBy('post.createdAt', 'DESC'),
      params,
    );
  }

  async getPost(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  async create({ tags, ...data }: CreatePostDto) {
    const tagList = [];

    tags.forEach(async (item) => {
      const foundTag = await this.tagService.getTag({ where: { id: item } });

      if (!foundTag) {
        ErrorHandler.throwNotFoundException(`tag ${item} not found`);
      }

      tagList.push(foundTag);
    });

    return this.postRepository.save({
      ...data,
      tags: tagList,
    });
  }
}
