import { Repository } from 'typeorm';
import { CoreService } from './core.abstract';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ValidationError } from './error';

export class BaseService<T> extends CoreService {
  constructor(protected repo: Repository<T>) {
    super();
  }

  throwErrorFieldException(field: string, msg: string): ValidationError {
    throw new ValidationError(field, msg);
  }

  throwBadRequestException(msg?: unknown): BadRequestException {
    throw new BadRequestException(msg);
  }

  throwNotFoundException(name: string): NotFoundException {
    throw new NotFoundException(`${name} not found`);
  }
}
