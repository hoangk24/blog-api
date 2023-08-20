import { BadRequestException } from '@nestjs/common';

export class ValidationError extends BadRequestException {
  constructor(property: string, message: string) {
    super([
      {
        property,
        message,
      },
    ]);
  }
}
