/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utills/catchAsync';
import sendResponse from '../../utills/sendResponse';
import { blogService } from './blogs.service';

const createBlog = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await blogService.createBlog(payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

export const blogsController = {
  createBlog,
};
