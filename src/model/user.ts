import { User } from '@/users/entities/user.entity';

export type UserWithoutPrivateFields = Omit<User, 'password' | 'isActive'>;
