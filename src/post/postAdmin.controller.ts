import { AdminGuard } from '@/decorators/roles.decorators';
import { RequestWithUser } from '@/type';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostAdminService } from './postAdmin.service';
@ApiBearerAuth()
@ApiTags('admin/post')
@Controller('admin/post')
export class PostAdminController {
  constructor(private readonly postService: PostAdminService) {}

  @AdminGuard()
  @Get(':id')
  getPostDetail(@Param('id') id: number) {
    return this.postService.getPost(id);
  }

  @AdminGuard()
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

  @AdminGuard()
  @Put(':id')
  async updatePost(@Param('id') id: number, @Body() payload: UpdatePostDto) {
    return this.postService.update(id, payload);
  }

  @AdminGuard()
  @Post()
  async createPost(
    @Body() payload: CreatePostDto,
    @Request() req: RequestWithUser,
  ) {
    return this.postService.create(payload, req.user);
  }
}
