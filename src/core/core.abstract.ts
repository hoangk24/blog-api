import { ValidationError } from '@/core/error';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export abstract class CoreService {
  abstract throwBadRequestException(msg?: unknown): BadRequestException;

  abstract throwNotFoundException(name: string): NotFoundException;

  abstract throwErrorFieldException(
    field: string,
    msg: string,
  ): ValidationError;
}
