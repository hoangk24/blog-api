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
    return this.postRepository.findOne({
      ...options,
      // relations: ['author', 'tag'],
    });
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

  async getPostDetail({ id, slug }: { slug?: string; id?: number }) {
    let post: Post;
    if (id) {
      post = await this.findPost({
        where: {
          id,
        },
      });
    }

    if (slug) {
      post = await this.findPost({
        where: {
          id,
        },
      });
    }

    if (!post) {
      ErrorHandler.throwNotFoundException('post');
    }

    return post;
  }

  async getPosts(params: IPaginationOptions) {
    return paginate(
      this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect(`post.tags`, 'tags')
        .leftJoinAndSelect(`post.author`, 'author')
        .where(`post.deletedAt IS NULL`)
        .andWhere(`post.published IS NOT NULL`),
      params,
    );
  }

  async filterPost(filter: FindOptionsWhere<Post>[]) {
    const post = await this.postRepository.findBy(filter);

    if (!post) {
      ErrorHandler.throwNotFoundException(`post`);
    }

    return post;
  }

  async getLatestPost() {
    return await this.postRepository
      .createQueryBuilder('post')
      .orderBy('post.createdAt', 'DESC')
      .getOne();
  }
}
