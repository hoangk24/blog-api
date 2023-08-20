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
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';
import { JwtAuthGuard } from '@/auth/guard/jwt.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getPosts(
    @Request() req: RequestWithUser,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    console.log(req.user.id);

    return this.postService.getPosts({
      page,
      limit,
    });
  }

  @Get(':id')
  getPostDetail(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @Post()
  create(
    @Request() req: RequestWithUser,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postService.create(createPostDto, req.user.id);
  }

  @Get('/user/post')
  findAll() {
    // return this.postService.findAll();
  }

  @Patch('/user/post/:id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    // return this.postService.update(+id, updatePostDto);
  }

  @Delete('/user/post/:id')
  remove(@Param('id') id: string) {
    // return this.postService.remove(+id);
  }
}
