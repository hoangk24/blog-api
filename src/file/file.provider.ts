import {
  CloudinaryStorageStrategy,
  LocalStorageStrategy,
} from './file.strategies';
import { Storage } from './file.type';

type StorageMap = Record<
  Storage,
  typeof LocalStorageStrategy | typeof CloudinaryStorageStrategy
>;

const storageMap: StorageMap = {
  [Storage.LOCAL]: LocalStorageStrategy,
  [Storage.CLOUDINARY]: CloudinaryStorageStrategy,
};

export const StorageStrategyProvider = {
  provide: 'StorageStrategy',
  useClass: storageMap[process.env.FILE_STORAGE] ?? LocalStorageStrategy,
};
