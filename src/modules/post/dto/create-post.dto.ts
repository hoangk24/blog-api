import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  banner?: string;

  @IsString()
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  published?: string;

  @IsString()
  @ApiProperty()
  content: string;

  @IsOptional()
  @ApiPropertyOptional({ type: 'number', isArray: true })
  tags?: number[];
}
