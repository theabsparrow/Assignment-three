import { TUserBody } from './user.interface';
import { User } from './user.model';

const createUser = async (payload: TUserBody) => {
  console.log(payload);
  const result = await User.create(payload);
  return result;
};

export const userService = {
  createUser,
};
