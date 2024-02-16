import {
  Controller,
  Get,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Body,
  Post,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { AdminGuard } from '@/decorators/roles.decorators';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tag.dto';

@ApiBearerAuth()
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @AdminGuard()
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.tagService.findAll({ page, limit });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tagService.findOne(id);
  }
}
