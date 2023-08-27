import { BaseService } from '@/core/base.service';
import { FileService } from '@/file/file.service';
import { User } from '@/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService extends BaseService<Post> {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private fileService: FileService, // private dataSource: DataSource,
  ) {
    super(postRepository);
  }

  async getAllWithPaginate(params: IPaginationOptions) {
    const query = this.postRepository.createQueryBuilder();
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

  //!START ADMIN
  async create(
    payload: CreatePostDto,
    author: User,
    file?: Express.Multer.File,
  ) {
    const post = new Post();
    post.content = payload.content;
    post.title = payload.title;
    // post.author = author;

    if (file) {
      const photoId = await this.fileService.upload(file);
      post.posterId = photoId;
    }

    this.postRepository.save(post);
  }
  // async create(
  //   { content, title }: CreatePostDto,
  //   author: User,
  //   file?: Express.Multer.File,
  // ) {
  //   const runQuery = createTransaction(this.dataSource);
  //   return runQuery(async (queryRunner) => {
  //     const post = new Post();
  //     post.content = content;
  //     post.title = title;
  //     post.author = author;
  //     if (file) {
  //       const photoId = await this.fileService.upload(file);
  //       post.posterId = photoId;
  //     }

  //     const slide = await queryRunner.manager.save(
  //       this.postRepository.save(post),
  //     );
  //     return slide;
  //   });
  // }

  async getMany(params: IPaginationOptions) {
    const query = this.repo.createQueryBuilder();
    return paginate(query, params);
  }

  async delete(id: number) {
    return this.repo.softDelete({ id });
  }

  async update(id: number, payload: UpdatePostDto) {
    return this.repo.update({ id }, payload);
  }
  //!END ADMIN
}
