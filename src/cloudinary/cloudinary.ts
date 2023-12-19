import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'hoangtn4',
      api_key: '654724426313297',
      api_secret: 'xQcam8YdydiuJ7TtJUKwBun7GqI',
    });
  },
};
