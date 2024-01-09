import { BadRequestException, NotFoundException } from '@nestjs/common';

export class ErrorHandler {
  static throwErrorFieldException(field: string, msg: string): ValidationError {
    throw new ValidationError(field, msg);
  }

  static throwBadRequestException(msg?: unknown): BadRequestException {
    throw new BadRequestException(msg);
  }

  static throwNotFoundException(name: string): NotFoundException {
    throw new NotFoundException(`${name} not found.`);
  }
}

class ValidationError extends BadRequestException {
  constructor(property: string, message: string) {
    super([
      {
        property,
        message,
      },
    ]);
  }
}