import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { TBlogBody } from './blogs.interface';
import { Blogs } from './blogs.model';

const createBlog = async (payload: TBlogBody, email: string) => {
  const isUserExist = await User.findOne({ email });
  if (!isUserExist) {
    throw new AppError(
      StatusCodes.EXPECTATION_FAILED,
      'the user with this email dosen`t exist',
    );
  }
  const blogInfo = { ...payload, author: isUserExist._id };
  const result = await Blogs.create(blogInfo);
  return result;
};

export const blogService = {
  createBlog,
};
