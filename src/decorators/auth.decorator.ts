// import { ROLES_KEY, Role as UserRole } from '#/guard/role.guard';
import { ROLES_KEY } from '@/auth/guard/role.guard';
import { UserRole } from '@/model/user';
import { SetMetadata } from '@nestjs/common';

export const JWTRole = (role: UserRole) => SetMetadata(ROLES_KEY, role);
