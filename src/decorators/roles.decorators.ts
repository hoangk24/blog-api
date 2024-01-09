import { JwtAuthGuard } from '@/auth/guard/jwt-auth.guard';
import { RolesGuard } from '@/auth/guard/role.guard';
import { UserRole } from '@/models/user';
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';

const HasRoles = (role: UserRole) => SetMetadata('role', role);

export const AdminGuard = () =>
  applyDecorators(
    HasRoles(UserRole.ADMIN),
    UseGuards(JwtAuthGuard, RolesGuard),
  );

export const UserGuard = () =>
  applyDecorators(HasRoles(UserRole.USER), UseGuards(JwtAuthGuard, RolesGuard));
