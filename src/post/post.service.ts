import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { FindOneOptions, In, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { ErrorHandler } from '@/cores/error.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findPost(options: FindOneOptions<Post>) {
    return this.postRepository.findOne(options);
  }
  async getPosts(params: IPaginationOptions) {
    const queryBuilder = await this.postRepository
      .createQueryBuilder('post')
      .where('post.deletedAt IS NULL')
      .leftJoinAndSelect('post.tags', 'tags');

    return paginate(queryBuilder, params);
  }

  async getPost(slug: string) {
    const post = await this.postRepository.findOneBy({ slug });
    if (!post) {
      ErrorHandler.throwNotFoundException(`post ${slug}`);
    }

    return post;
  }

  async getPostByIds(ids: number[]) {
    return this.postRepository.find({
      where: {
        id: In(ids),
      },
    });
  }
}
