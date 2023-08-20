import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostAdminService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private userService: UsersService,
  ) {}

  async getPosts(params: IPaginationOptions) {
    return paginate(this.postRepository, params);
  }

  async create(createPostDto: CreatePostDto, userId: number) {
    const author = await this.userService.findOne({
      where: {
        id: userId,
      },
    });
    return this.postRepository.save({
      ...createPostDto,
      author,
    });
  }

  async findOne(id: number) {
    return this.postRepository
      .createQueryBuilder('post')
      .where('post.id = :id', { id })
      .leftJoinAndSelect('post.author', 'user')
      .getOne();
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
