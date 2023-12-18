import { UserRole } from '@/model/user';
import { RequestWithUser } from '@/type';
import {
  CanActivate,
  ExecutionContext,
  Type,
  UseGuards,
  applyDecorators,
  mixin,
} from '@nestjs/common';
import { JwtAuthGuardPrivate, JwtAuthGuardPublic } from './guard/jwt.guard';

// TODO:

export const RoleChecker = (role: UserRole): Type<CanActivate> => {
  @UseGuards(JwtAuthGuardPrivate)
  class RoleGuardMixin {
    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;
      console.log(user);

      return user.role === role;
    }
  }
  return mixin(RoleGuardMixin);
};

export const ApplyUser = () => applyDecorators(UseGuards(JwtAuthGuardPrivate));
export const ApplyUserOrNot = () =>
  applyDecorators(UseGuards(JwtAuthGuardPublic));
