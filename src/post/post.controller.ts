import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { FindOptionsWhere, In } from 'typeorm';
import { Post } from './entities/post.entity';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('latest')
  getLatestPost() {
    return this.postService.getLatestPost();
  }

  @Get('detail')
  getPostDetail(
    @Query('id') id?: number,
    @Query('slug')
    slug?: string,
  ) {
    return this.postService.getPostDetail({
      slug,
      id,
    });
  }

  @Get('filter')
  getPostsBy(
    @Query('id') id?: number,
    @Query('slug') slug?: string,
    @Query('ids') ids?: string,
  ) {
    const filter: FindOptionsWhere<Post>[] = [];

    if (id) {
      filter.push({ id });
    }

    if (slug) {
      filter.push({ slug });
    }

    if (ids) {
      const idList = ids.split(',');

      filter.push({
        id: In(idList),
      });
    }

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
