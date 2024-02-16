import { ConfigModule, ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    return cloudinary.config({
      cloud_name: configService.get('cloudinary.cloudName'),
      api_key: configService.get('cloudinary.apiKey'),
      api_secret: configService.get('cloudinary.apiSecret'),
    });
  },
  inject: [ConfigService],
};
