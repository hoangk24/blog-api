import { BaseService } from '@/core/base.service';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/File.entity';
import { StorageStrategy } from './file.type';

@Injectable()
export class FileService extends BaseService<File> {
  constructor(
    @Inject('StorageStrategy')
    private readonly storage: StorageStrategy,
    @InjectRepository(File) repo: Repository<File>,
  ) {
    super(repo);
  }

  async upload(file: Express.Multer.File) {
    const url = await this.storage.upload(file);
    const newFile = new File();
    newFile.name = file.originalname;
    newFile.size = file.size;
    newFile.url = url;

    const result = await this.repo.save(newFile);

    return result.id;
  }
}
