import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { UploadMediaDto } from './dto/uploadMedia.dto';
import { CloudinaryService } from '@/cloudinary/cloudinary.service';
import { AdminGuard } from '@/decorators/roles.decorators';

@ApiBearerAuth()
@ApiTags('admin/media')
@Controller('admin/media')
export class MediaAdminController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @AdminGuard()
  @Post()
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  async createPost(@Body() payload: UploadMediaDto) {
    return this.cloudinaryService.uploadFile(payload.file);
  }
}
