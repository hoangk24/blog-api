import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/File.entity';
import { StorageStrategyProvider } from './file.provider';

@Module({
  imports: [TypeOrmModule.forFeature([File])],
  providers: [FileService, StorageStrategyProvider],
  exports: [FileService],
})
export class FileModule {}
