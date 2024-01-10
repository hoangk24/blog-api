import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TagService } from './tag.service';

@ApiBearerAuth()
@ApiTags('tags')
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getTags() {
    return this.tagService.getTags();
  }
}
