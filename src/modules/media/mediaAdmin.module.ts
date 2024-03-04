import { CloudinaryModule } from '@/modules/cloudinary/cloudinary.module';
import { Module } from '@nestjs/common';
import { MediaAdminController } from './mediaAdmin.controller';

@Module({
  imports: [CloudinaryModule],
  controllers: [MediaAdminController],
})
export class MediaModule {}
