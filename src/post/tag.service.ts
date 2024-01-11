import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { ErrorHandler } from '@/cores/error.service';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async getTags() {
    return this.tagRepository.find();
  }

  async findOne(option: FindOneOptions<Tag>) {
    return this.tagRepository.findOne(option);
  }

  async getTag(tag: string) {
    const foundedTag = await this.tagRepository.findOneBy({ label: tag });
    if (!foundedTag) {
      ErrorHandler.throwNotFoundException(`tag ${tag}`);
    }
    return foundedTag;
  }
}
