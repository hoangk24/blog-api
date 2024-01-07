import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { FileSystemStoredFile, HasMimeType, IsFile } from 'nestjs-form-data';

export class UploadMediaDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  @IsFile()
  @HasMimeType(['image/jpeg', 'image/png'])
  file?: FileSystemStoredFile;
}
