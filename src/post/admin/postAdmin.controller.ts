/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostAdminService } from './postAdmin.service';
import { UserRole } from '@/model/user';
import { RoleChecker } from '@/auth/auth.decorator';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Controller('admin/posts')
export class PostAdminController {
  constructor(public service: PostAdminService) {}

  @UseGuards(RoleChecker(UserRole.ADMIN))
  @Get()
  async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.service.getAllWithPaginate({ page, limit });
  }

  @UseGuards(RoleChecker(UserRole.ADMIN))
  @Post('approved/:id')
  async approved(@Param(':id') id: number) {
    return this.service.approved(id);
  }

  @UseGuards(RoleChecker(UserRole.ADMIN))
  @Delete(':id')
  async delete(@Param(':id') id: number) {
    return this.service.delete(id);
  }
}
