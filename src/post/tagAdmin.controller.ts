import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagAdminService } from './tagAdmin.service';
import { AdminGuard } from '@/decorators/roles.decorators';

@ApiBearerAuth()
@ApiTags('admin/tags')
@Controller('admin/tags')
export class TagAdminController {
  constructor(private readonly tagService: TagAdminService) {}

  @AdminGuard()
  @Get()
  async getTags(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.tagService.getTags({ page, limit });
  }

  @AdminGuard()
  @Get('list')
  async getTagsList() {
    return this.tagService.getTagList();
  }

  @AdminGuard()
  @Post()
  async createTag(@Body() payload: CreateTagDto) {
    return this.tagService.createTag(payload);
  }
}
