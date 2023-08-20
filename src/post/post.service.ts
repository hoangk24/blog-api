import { BaseService } from '@/core/base.service';
import { UserWithoutPrivateFields } from '@/model/user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService extends BaseService<Post> {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {
    super(postRepository);
  }

  async createPost(payload: CreatePostDto, author: UserWithoutPrivateFields) {
    return await this.postRepository.save({
      ...payload,
      author,
    });
  }

  async getAllWithPaginate(params: IPaginationOptions) {
    const query = this.postRepository.createQueryBuilder();
    // .where('isApproved = :isApproved', { isApproved: true });
    return paginate(query, params);
  }

  async getFavoritePostOfUser(id: number) {
    return this.postRepository.find({
      where: {
        author: {
          id,
        },
      },
    });
  }

  async getDetail(id: number) {
    return this.postRepository.findOne({
      where: {
        id,
      },
      relations: ['author'],
    });
  }
}
