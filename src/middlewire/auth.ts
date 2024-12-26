import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utills/catchAsync';
import AppError from '../error/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...userRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not authorized');
    }
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decode) {
        if (err) {
          throw new AppError(
            StatusCodes.UNAUTHORIZED,
            'you are not authorized',
          );
        }
        const role = (decode as JwtPayload).role;
        if (userRole && !userRole.includes(role)) {
          throw new AppError(
            StatusCodes.UNAUTHORIZED,
            'you are not authorized',
          );
        }
        req.user = decode as JwtPayload;
        next();
      },
    );
  });
};

export default auth;
