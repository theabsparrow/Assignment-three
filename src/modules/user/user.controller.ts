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

export const userController = {
  createUser,
  createAdmin,
};
