/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utills/catchAsync';
import sendResponse from '../../utills/sendResponse';
import { blogService } from './blogs.service';

// only a user with the role 'user' can create a blog
const createBlog = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const { userEmail } = req.user;
  const result = await blogService.createBlog(payload, userEmail);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

// only the user with the role 'user' can update the title and content of a blog
const updateBlog = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const payload = req.body;
  const { userEmail } = req.user;
  const result = await blogService.updateABlog(payload, userEmail, id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

// user can delete his own blog
const deleteACertainBlog = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const { userEmail } = req.user;
  const result = await blogService.deleteACertainBlog(id, userEmail);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: result,
  });
});

// admin can delete any blog
const deleteBlogByAdmin = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await blogService.deleteBlogByAdmin(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: result,
  });
});
export const blogsController = {
  createBlog,
  updateBlog,
  deleteACertainBlog,
  deleteBlogByAdmin,
};
