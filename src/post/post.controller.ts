import { ApplyUser, RoleChecker } from '@/auth/auth.decorator';
import { UserRole } from '@/model/user';
import { RequestWithUser } from '@/type';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { storage } from '@/config/storage.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(RoleChecker(UserRole.USER))
  @Get('favorites')
  getFavoritePostOfUser(@Request() req: RequestWithUser) {
    return this.postService.getFavoritePostOfUser(req.user.id);
  }

  @Get(':id')
  getPostDetail(@Param(':id') id: number) {
    return this.postService.getDetail(id);
  }

  @Get()
  async getPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.postService.getAllWithPaginate({
      page,
      limit,
    });
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage }))
  @ApplyUser()
  async createPost(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: RequestWithUser,
    @Body() payload: CreatePostDto,
  ) {
    return this.postService.create(payload, req.user, file);
  }
}
