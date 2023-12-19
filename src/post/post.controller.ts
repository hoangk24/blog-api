import { JwtGuard } from '@/auth/guard/jwt.guard';
import { RequestWithUser } from '@/type';
import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

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

  @Get('by')
  getData(@Query('ids', new ParseArrayPipe({ items: Number })) ids: number[]) {
    return this.postService.getPostByIds(ids);
  }

  addWishList(@Req() { user }: RequestWithUser) {
    //noo
  }
}
