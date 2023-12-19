import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import { validateConfig } from 'src/utils/validate';
import { CloudinaryConfig } from './config.type';

class EnvironmentVariablesValidator {
  @IsString()
  CLOUDINARY_NAME: string;

  @IsString()
  CLOUDINARY_API_KEY: string;

  @IsString()
  CLOUDINARY_API_SECRET: string;
}

export default registerAs<CloudinaryConfig>('cloudinary', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    cloudName: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  };
});
