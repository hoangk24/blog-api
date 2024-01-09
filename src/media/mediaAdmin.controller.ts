import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { UploadMediaDto } from './dto/uploadMedia.dto';
import { CloudinaryService } from '@/cloudinary/cloudinary.service';
import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { RolesGuard } from '@/auth/guard/role.guard';
import { HasRoles } from '@/decorators/roles.decorators';
import { UserRole } from '@/models/user';

@ApiBearerAuth()
@ApiTags('admin/media')
@Controller('admin/media')
export class MediaAdminController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  async createPost(@Body() payload: UploadMediaDto) {
    return this.cloudinaryService.uploadFile(payload.file);
  }
}
