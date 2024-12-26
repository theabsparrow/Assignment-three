import { USER_ROLE } from './user.constant';

export type TRole = 'admin' | 'user';

// user interface
export type TUser = {
  name: string;
  email: string;
  password: string;
  role: TRole;
  isBlocked: boolean;
};

// user body interface comes from req.body
export type TUserBody = {
  name: string;
  email: string;
  password: string;
};

// user update interface
export type TUpdateUserInfo = {
  name?: string;
  email?: string;
};

export type TUserRole = keyof typeof USER_ROLE;
