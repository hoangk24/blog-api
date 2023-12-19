import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  IsFile,
  MaxFileSize,
  HasMimeType,
  MemoryStoredFile,
  FileSystemStoredFile,
} from 'nestjs-form-data';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  @IsFile()
  @MaxFileSize(1e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  poster: FileSystemStoredFile;
}
