import AppError from '../../error/AppError';
import { TUpdateUserInfo, TUserBody } from './user.interface';
import { User } from './user.model';
import { StatusCodes } from 'http-status-codes';

// the user here will be created with the role 'user'
const createUser = async (payload: TUserBody) => {
  const userPayload = { ...payload, role: 'user' };

  const result = await User.create(userPayload);
  return result;
};

// the user here will be created with the role 'admin'
const createAdmin = async (payload: TUserBody) => {
  const adminPayload = { ...payload, role: 'admin' };
  const result = await User.create(adminPayload);
  return result;
};

// only admin can see all the user from the database
const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

// only admin can see a single user from the database
const getSingleUser = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

// user and admin both can update their name and email
const updateUserInfo = async (id: string, payload: TUpdateUserInfo) => {
  const isUSerExist = await User.findById(id);
  if (!isUSerExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'this user does not exist');
  }
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

// only admin can block a user
const blockUser = async (id: string) => {
  const isUSerExist = await User.findById(id);

  if (!isUSerExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'this user does not exist');
  }
  if (isUSerExist.isBlocked === true) {
    throw new AppError(StatusCodes.CONFLICT, 'this user is already blocked');
  }

  await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
  return {};
};

export const userService = {
  createUser,
  createAdmin,
  getAllUsers,
  getSingleUser,
  blockUser,
  updateUserInfo,
};
