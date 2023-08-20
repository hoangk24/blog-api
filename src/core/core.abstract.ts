import { ValidationError } from '@/core/error';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export abstract class CoreService {
  throwBadRequestException(msg?: unknown): BadRequestException {
    throw new BadRequestException(msg);
  }

  throwNotFoundException(name: string): NotFoundException {
    throw new NotFoundException(`${name} not found`);
  }

  throwErrorFieldException(field: string, msg: string): ValidationError {
    throw new ValidationError(field, msg);
  }
}
