import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagAdminService } from './tagAdmin.service';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { RolesGuard } from '@/auth/guard/role.guard';
import { HasRoles } from '@/decorators/roles.decorators';
import { UserRole } from '@/models/user';

@ApiTags('admin/tags')
@Controller('admin/tags')
export class TagAdminController {
  constructor(private readonly tagService: TagAdminService) {}

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getTags(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.tagService.getTags({ page, limit });
  }

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('list')
  async getTagsList() {
    return this.tagService.getTagList();
  }

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createTag(@Body() payload: CreateTagDto) {
    return this.tagService.createTag(payload);
  }
}
