import { User } from '@/user/entities/user.entity';

export type UserWithoutPrivateFields = Omit<User, 'password' | 'isActive'>;

export const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
