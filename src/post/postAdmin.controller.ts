import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostAdminService } from './postAdmin.service';

@ApiTags('admin/post')
@Controller('admin/post')
export class PostAdminController {
  constructor(private readonly postService: PostAdminService) {}

  @Get(':id')
  getPostDetail(@Param(':id') id: number) {
    return this.postService.getPost(id);
  }

  @Get()
  async getPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.postService.getPosts({
      page,
      limit,
    });
  }

  @Post()
  async createPost(@Body() payload: CreatePostDto) {
    return this.postService.create(payload);
  }
}
