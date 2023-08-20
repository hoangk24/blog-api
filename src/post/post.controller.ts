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
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

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
    return this.postService.findOne({
      where: {
        id,
      },
      relations: ['author'],
    });
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
  @ApplyUser()
  async createPost(
    @Request() req: RequestWithUser,
    @Body() payload: CreatePostDto,
  ) {
    return this.postService.createPost(payload, req.user);
  }
}
