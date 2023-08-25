import { ApplyUser } from '@/auth/auth.decorator';
import { storage } from '@/config/storage.config';
import { RequestWithUser } from '@/type';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('admin/posts')
export class PostAdminController {
  constructor(public service: PostService) {}

  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.service.getMany({ page, limit });
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage }))
  @ApplyUser()
  async createPost(
    @UploadedFile() file: Express.Multer.File,
    @Request() req: RequestWithUser,
    @Body() payload: CreatePostDto,
  ) {
    return this.service.create(payload, req.user, file);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() payload: UpdatePostDto) {
    return this.service.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param(':id') id: number) {
    return this.service.delete(id);
  }
}
