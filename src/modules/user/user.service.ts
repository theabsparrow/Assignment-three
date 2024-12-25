import AppError from '../../error/AppError';
import { TUpdateUserInfo, TUserBody } from './user.interface';
import { User } from './user.model';
import { StatusCodes } from 'http-status-codes';

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

const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const updateUserInfo = async (id: string, payload: TUpdateUserInfo) => {
  const isUSerExist = await User.findById(id);
  if (!isUSerExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'this user does not exist');
  }

  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const blockUser = async (id: string) => {
  const isUSerExist = await User.findById(id);

  if (!isUSerExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'this user does not exist');
  }
  if (isUSerExist.isBlocked === true) {
    throw new AppError(StatusCodes.CONFLICT, 'this user is already blocked');
  }

  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true },
  );
  return result;
};

export const userService = {
  createUser,
  createAdmin,
  getAllUsers,
  getSingleUser,
  blockUser,
  updateUserInfo,
};
