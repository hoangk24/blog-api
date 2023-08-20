import { paginate } from 'nestjs-typeorm-paginate';
import {
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectId,
  Repository,
} from 'typeorm';
import { CoreService } from './core.abstract';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class BaseService<T> extends CoreService {
  constructor(protected repo: Repository<T>) {
    super();
  }

  async findOne(options: FindOneOptions<T>): Promise<T> {
    paginate;
    return await this.repo.findOne(options);
  }

  async findMany(option: FindManyOptions<T>): Promise<T[]> {
    return this.repo.find(option);
  }

  async delete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<T>,
  ) {
    return await this.repo.delete(criteria);
  }

  async update(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ) {
    return await this.repo.update(criteria, partialEntity);
  }
}
