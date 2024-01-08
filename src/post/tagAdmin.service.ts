import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagAdminService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async getTag(option: FindOneOptions<Tag>) {
    return this.tagRepository.findOne(option);
  }

  async createTag(payload: CreateTagDto) {
    return this.tagRepository.save(payload);
  }

  async getTags(params: IPaginationOptions) {
    const queryBuilder = this.tagRepository.createQueryBuilder('tags');

    return paginate(queryBuilder, params);
  }

  async getTagList() {
    return this.tagRepository.find();
  }
}
