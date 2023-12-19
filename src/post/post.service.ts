import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { In, Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async getPosts(params: IPaginationOptions) {
    return paginate(this.postRepository.createQueryBuilder(), params);
  }

  async getPost(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  async getPostByIds(ids: number[]) {
    return this.postRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  // queryBuilder() {}
}
