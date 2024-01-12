import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseArrayPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { FindOptionsWhere } from 'typeorm';
import { Post } from './entities/post.entity';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('idList')
  getData(@Query('ids', new ParseArrayPipe({ items: Number })) ids: number[]) {
    return this.postService.getPostByIds(ids);
  }

  @Get('filter')
  getPostsBy(@Query('id') id?: number, @Query('slug') slug?: string) {
    const filter = [id, slug].filter(
      (item) => item != null,
    ) as FindOptionsWhere<Post>[];

    return this.postService.filterPost(filter);
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
}
