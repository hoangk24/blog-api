import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'Test',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Test',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: 'Test',
  })
  @IsNotEmpty()
  shortTitle: string;

  @ApiProperty({ type: 'integer', isArray: true, example: [1, 2, 3] })
  @IsNumber({}, { each: true })
  tags: number[];

  @ApiProperty({
    example: 'Test',
  })
  @IsString()
  thumbnail: string;

  @ApiProperty({
    example: 'Test',
  })
  @IsString()
  poster: string;

  @IsString()
  slug: string;
}
