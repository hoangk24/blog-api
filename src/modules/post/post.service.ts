import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { In, Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { CreatePostDto } from './dto/create-post.dto';
import { UsersService } from '@/modules/user/user.service';
import { ErrorHandler } from '@/cores/error.service';
import { TagService } from './tag.service';
import { Tag } from './entities/tag.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private readonly userService: UsersService,
    private readonly tagService: TagService,
  ) {}

  async create({ tags, ...requiredData }: CreatePostDto, authorId: number) {
    const tagList: Tag[] = tags?.length
      ? await this.tagService.findBy({
          id: In(tags),
        })
      : [];

    return await this.postsRepository.save({
      ...requiredData,
      author: await this.userService.findOne({ where: { id: authorId } }),
      tags: tagList,
    });
  }

  async findAll(params: IPaginationOptions) {
    const queryBuilder = this.postsRepository
      .createQueryBuilder('post')
      .where('post.published IS NOT NULL')
      .leftJoinAndSelect('post.tags', 'tags')
      .leftJoinAndSelect('post.author', 'author');

    return paginate(queryBuilder, params);
  }

  async findOne(id: number) {
    const post = await this.postsRepository
      .createQueryBuilder('post')
      .where('post.id=:id', { id })
      .andWhere('post.published IS NOT NULL')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.tags', 'tags')
      .getOne();

    if (!post) {
      ErrorHandler.throwNotFoundException(`post ${id}`);
    }

    return post;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
