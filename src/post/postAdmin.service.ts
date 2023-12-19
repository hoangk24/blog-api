import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { Post } from './entities/post.entity';
import { Tag } from './entities/tag.entity';
import { CloudinaryService } from '@/cloudinary/cloudinary.service';

@Injectable()
export class PostAdminService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Post)
    private tagRepository: Repository<Tag>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async getPosts(params: IPaginationOptions) {
    return paginate(this.postRepository.createQueryBuilder(), params);
  }

  async getPost(id: number) {
    return this.postRepository.findOneBy({ id });
  }

  async create({ poster, ...data }: CreatePostDto) {
    const url = poster ? await this.cloudinaryService.uploadFile(poster) : null;

    return this.postRepository.save({
      ...data,
      poster: url,
    });
  }

  async createTag(payload: CreateTagDto) {
    return this.tagRepository.save(payload);
  }
}
