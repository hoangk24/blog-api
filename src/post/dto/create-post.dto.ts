import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsNotEmpty()
  slug: string;

  @IsOptional()
  posterId?: number;
}
