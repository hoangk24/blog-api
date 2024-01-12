import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { ErrorHandler } from '@/cores/error.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  //Shared function
  async findPost(options: FindOneOptions<Post>) {
    return this.postRepository.findOne(options);
  }

  queryBuilder(alias: string) {
    return this.postRepository
      .createQueryBuilder(alias)
      .leftJoinAndSelect(`${alias}.tags`, 'tags')
      .leftJoinAndSelect(`${alias}.author`, 'author')
      .where(`${alias}.published IS NOT NULL`)
      .andWhere(`${alias}.deletedAt IS NULL`);
  }

  //========Filter function============

  async getPosts(params: IPaginationOptions) {
    return paginate(this.queryBuilder('post'), params);
  }

  async getPostBySlugOrId(slugOrId: string) {
    const post = await this.queryBuilder('post')
      .where('id=:id', { slugOrId })
      .orWhere('id=:id', { slugOrId });

    if (!post) {
      ErrorHandler.throwNotFoundException(`post`);
    }

    return post;
  }

  async filterPost(filter: FindOptionsWhere<Post>[]) {
    const post = await this.postRepository.findBy(filter);

    if (!post) {
      ErrorHandler.throwNotFoundException(`post`);
    }

    return post;
  }

  async getPostByIds(ids: number[]) {
    return await this.queryBuilder('post')
      .andWhere('post.id IN (:ids)', { ids })
      .getMany();
  }
}
