/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { userService } from './user.service';
import sendResponse from '../../utills/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utills/catchAsync';

const createUser = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await userService.createUser(payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user registered successfully',
    data: result,
  });
});

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

const getAllUsers = catchAsync(async (req, res, next) => {
  const result = await userService.getAllUsers();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'users are retrived successfully',
    data: result,
  });
});

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

const blockUser = catchAsync(async (req, res, next) => {
  const id = req.params.userId;
  const result = await userService.blockUser(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user is blocked successfully',
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
