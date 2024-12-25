import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utills/catchAsync';
import sendResponse from '../../utills/sendResponse';
import { authService } from './auth.service';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

const loginUser = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await authService.loginUser(payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user login successfully',
    data: result,
  });
});

export const authController = {
  loginUser,
};
