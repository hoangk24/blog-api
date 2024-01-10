import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':slug')
  getPostDetail(@Param(':slug') slug: string) {
    return this.postService.getPost(slug);
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

  @Get('by')
  getData(@Query('ids', new ParseArrayPipe({ items: Number })) ids: number[]) {
    return this.postService.getPostByIds(ids);
  }
}
