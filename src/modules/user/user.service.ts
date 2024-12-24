import { TUserBody } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: TUserBody) => {
  const userPayload = { ...payload, role: 'user' };

  const result = await User.create(userPayload);
  return result;
};

const createAdmin = async (payload: TUserBody) => {
  const adminPayload = { ...payload, role: 'admin' };
  const result = await User.create(adminPayload);
  return result;
};

export const userService = {
  createUser,
  createAdmin,
};
