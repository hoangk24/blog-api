import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guard/jwt.guard';

export const PrivateRoute = () => {
  return applyDecorators(UseGuards(JwtAuthGuard));
};
