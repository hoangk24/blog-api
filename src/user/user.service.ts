import { ErrorHandler } from '@/cores/error.service';
import { UserRole } from '@/models/user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LikePostDto } from './dto/like-post.dto';
import { PostService } from '@/post/post.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private postService: PostService,
  ) {}

  async findOne(options: FindOneOptions<User>) {
    return this.userRepository.findOne(options);
  }

  async create(payload: CreateUserDto) {
    const { email } = payload;
    const userExits = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    if (userExits) {
      ErrorHandler.throwErrorFieldException('email', 'Email has been used.');
    }
    return this.userRepository.save({
      ...payload,
      role: UserRole.USER,
    });
  }

  async likePost(payload: LikePostDto, user: User) {
    const post = await this.postService.findPost({
      where: {
        id: payload.postId,
      },
    });
    if (!post) {
      ErrorHandler.throwNotFoundException(`post ${payload.postId}`);
    }
    const isUserLikedPost = user.likedPosts
      .map((item) => item.id)
      .includes(post.id);

    if (isUserLikedPost) {
      return this.userRepository.save({
        ...user,
        likedPosts: user.likedPosts.filter((item) => item.id !== post.id),
      });
    }

    return this.userRepository.save({
      ...user,
      likedPosts: [post, ...user.likedPosts],
    });
  }
}
