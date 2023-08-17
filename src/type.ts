import { UserWithoutPrivateFields } from './model/user';

export type RequestWithUser = Request & {
  user: UserWithoutPrivateFields;
};
