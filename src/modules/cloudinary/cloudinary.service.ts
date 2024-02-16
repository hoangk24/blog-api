import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { FileSystemStoredFile } from 'nestjs-form-data';

@Injectable()
export class CloudinaryService {
  async uploadFile(
    file: Express.Multer.File | FileSystemStoredFile,
  ): Promise<string> {
    const response = await cloudinary.uploader.upload(file.path);
    return response.url;
  }
}
