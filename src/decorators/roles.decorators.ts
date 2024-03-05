import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { RolesGuard } from '@/guards/role.guard';
import { UserRole } from '@/models/user';
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';

const HasRoles = (role: UserRole) => SetMetadata('role', role);

//For admin
export const AdminGuard = () =>
  applyDecorators(
    HasRoles(UserRole.ADMIN),
    UseGuards(JwtAuthGuard, RolesGuard),
  );

//For user
export const UserGuard = () =>
  applyDecorators(HasRoles(UserRole.USER), UseGuards(JwtAuthGuard, RolesGuard));
