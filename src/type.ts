import { UserWithoutPrivateFields } from './models/user';
import { User } from './user/entities/user.entity';

export type RequestWithUser = Request & {
  user: User;
};

export type RequestWithOptionUser = Request &
  Partial<{
    user?: UserWithoutPrivateFields;
  }>;
