import { CloudinaryModule } from '@/cloudinary/cloudinary.module';
import { Module } from '@nestjs/common';
import { MediaAdminController } from './mediaAdmin.controller';

@Module({
  imports: [CloudinaryModule],
  controllers: [MediaAdminController],
  providers: [],
})
export class MediaModule {}
