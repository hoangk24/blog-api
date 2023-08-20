import { CanActivate, ExecutionContext, Type, mixin } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.guard';
import { UserRole } from '@/model/user';
import { RequestWithUser } from '@/type';

export const RoleAuthGuard = (role: UserRole): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;
      return user.role === role;
    }
  }
  return mixin(RoleGuardMixin);
};
