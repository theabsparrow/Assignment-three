import { NextFunction, Request, Response } from 'express';
import { userService } from './user.service';
import sendResponse from '../../utills/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const result = await userService.createUser(payload);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'user registered successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const result = await userService.createAdmin(payload);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Admin created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userController = {
  createUser,
  createAdmin,
};
