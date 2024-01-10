import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async getTags() {
    return this.tagRepository.find();
  }

  async getTag(option: FindOneOptions<Tag>) {
    return this.tagRepository.findOne(option);
  }
}
