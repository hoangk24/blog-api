import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsFile, MemoryStoredFile } from 'nestjs-form-data';

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

  @ApiProperty()
  @IsOptional()
  posterId?: number;

  // @ApiProperty()
  // @IsFile()
  // poster: MemoryStoredFile;
}
