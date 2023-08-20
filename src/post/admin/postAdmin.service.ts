import { BaseService } from '@/core/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../entities/post.entity';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class PostAdminService extends BaseService<Post> {
  constructor(@InjectRepository(Post) repo) {
    super(repo);
  }

  async getAllWithPaginate(params: IPaginationOptions) {
    const query = this.repo.createQueryBuilder();
    return paginate(query, params);
  }

  async approved(id: number) {
    const post = await this.findOne({ where: { id } });
    if (!post) {
      this.throwNotFoundException('post');
    }
    return await this.update(id, { isApproved: true });
  }
}
