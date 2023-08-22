const Storage = {
  LOCAL: 'local',
  CLOUDINARY: 'cloudinary',
} as const;

type Storage = (typeof Storage)[keyof typeof Storage];

export { Storage };

export interface StorageStrategy {
  upload(file: Express.Multer.File): Promise<string>;
}
