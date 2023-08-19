import { PrivateRoute } from '@/auth/auth.decorator';
import { RequestWithUser } from '@/type';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

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

  @Get(':id')
  getPostDetail(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  //For user authenticated
  @PrivateRoute()
  @Post()
  create(
    @Request() req: RequestWithUser,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postService.create(createPostDto, req.user.id);
  }

  @PrivateRoute()
  @Get('/user/post')
  findAll() {
    // return this.postService.findAll();
  }

  @PrivateRoute()
  @Patch('/user/post/:id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    // return this.postService.update(+id, updatePostDto);
  }

  @PrivateRoute()
  @Delete('/user/post/:id')
  remove(@Param('id') id: string) {
    // return this.postService.remove(+id);
  }
}
