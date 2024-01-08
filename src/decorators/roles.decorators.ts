import { UserRole } from '@/models/user';
import { SetMetadata } from '@nestjs/common';

export const HasRoles = (role: UserRole) => SetMetadata('role', role);
