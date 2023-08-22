import { v2 } from 'cloudinary';
import * as fs from 'fs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { StorageStrategy } from './file.type';

export class CloudinaryStorageStrategy implements StorageStrategy {
  public async upload(file: Express.Multer.File): Promise<string> {
    try {
      const res = await v2.uploader.upload(file.path, {
        folder: 'kurabun',
        use_filename: true,
        resource_type: 'raw',
      });

      // Remove file from uploads folder
      fs.unlinkSync(file.path);

      return res.secure_url;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Upload file to cloudinary failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export class LocalStorageStrategy implements StorageStrategy {
  public async upload(file: Express.Multer.File): Promise<string> {
    return `${process.env.MEDIA_HOST}/${file.path}`;
  }
}
