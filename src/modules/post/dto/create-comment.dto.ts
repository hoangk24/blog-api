import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReplyDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsNumber()
  parentId: number;
}

export class CreateCommentDto {
  @IsNumber()
  @IsNumber()
  postId?: number;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  content: string;
}
