import { Body, Controller, Post } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { UploadMediaDto } from './dto/uploadMedia.dto';
import { CloudinaryService } from '@/cloudinary/cloudinary.service';

@ApiTags('admin/media')
@Controller('admin/media')
export class MediaAdminController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @Post()
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  async createPost(@Body() payload: UploadMediaDto) {
    return this.cloudinaryService.uploadFile(payload.file);
  }
}
