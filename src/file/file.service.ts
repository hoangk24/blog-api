import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/File.entity';
import { StorageStrategy } from './file.type';

@Injectable()
export class FileService {
  constructor(
    @Inject('StorageStrategy')
    private readonly storage: StorageStrategy,

    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  async get(id: number) {
    return this.fileRepository.findOneBy({ id });
  }

  async upload(file: Express.Multer.File) {
    const url = await this.storage.upload(file);
    const newFile = new File();

    newFile.name = file.originalname;
    newFile.size = file.size;
    newFile.url = url;

    const result = await this.fileRepository.save(newFile);

    return result.id;
  }
}
