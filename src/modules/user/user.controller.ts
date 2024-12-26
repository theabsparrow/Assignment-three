/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { userService } from './user.service';
import sendResponse from '../../utills/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utills/catchAsync';

// here user is created with the role 'user'
const createUser = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await userService.createUser(payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

// here user is created with the role 'admin'
const createAdmin = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await userService.createAdmin(payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin regestered successfully',
    data: result,
  });
});

// only admin can find all the user from the database
const getAllUsers = catchAsync(async (req, res, next) => {
  const result = await userService.getAllUsers();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'users are retrived successfully',
    data: result,
  });
});

// only admin can find a certain user from the database
const getSingleUSer = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await userService.getSingleUser(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user is retrived successfully',
    data: result,
  });
});

// user and admin both can update their name and email
const updateUserInfo = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await userService.updateUserInfo(id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user info updated successfully',
    data: result,
  });
});

// only admin can block a user
const blockUser = catchAsync(async (req, res, next) => {
  const id = req.params.userId;
  const result = await userService.blockUser(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user blocked successfully',
    data: result,
  });
});

export const userController = {
  createUser,
  createAdmin,
  getAllUsers,
  getSingleUSer,
  blockUser,
  updateUserInfo,
};
