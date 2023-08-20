import { RequestWithUser } from '@/type';
import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  Request,
} from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts(
    @Request() req: RequestWithUser,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.postService.getPosts({
      page,
      limit,
    });
  }
}
