import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { ErrorHandler } from '@/cores/error.service';
import { Tag } from './entities/tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    return await this.tagRepository.save(createTagDto);
  }

  async findAll(params: IPaginationOptions) {
    const queryBuilder = this.tagRepository.createQueryBuilder('tag');
    return paginate(queryBuilder, params);
  }

  async findBy(where: FindOptionsWhere<Tag> | FindOptionsWhere<Tag>[]) {
    return this.tagRepository.findBy(where);
  }

  async findOne(id: number) {
    const post = await this.tagRepository
      .createQueryBuilder('tag')
      .where('tag.id=:id', { id })
      .getOne();

    if (!post) {
      ErrorHandler.throwNotFoundException(`tag ${id}`);
    }

    return post;
  }
}
