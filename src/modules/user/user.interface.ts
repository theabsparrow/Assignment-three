import { USER_ROLE } from './user.constant';

export type TRole = 'admin' | 'user';

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: TRole;
  isBlocked: boolean;
};

export type TUserBody = {
  name: string;
  email: string;
  password: string;
};

export type TUpdateUserInfo = {
  name?: string;
  email?: string;
};

export type TUserRole = keyof typeof USER_ROLE;
