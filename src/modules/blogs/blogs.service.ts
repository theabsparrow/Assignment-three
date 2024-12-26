import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { TBlogBody } from './blogs.interface';
import { Blogs } from './blogs.model';

// only the user with the role 'user' can create blog
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

// only the user with the role 'user' can update the blog title and content
const updateABlog = async (
  payload: Partial<TBlogBody>,
  email: string,
  id: string,
) => {
  const isBlogExist = await Blogs.findById(id);
  if (!isBlogExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'this blog dosn`t exist');
  }

  const userID = isBlogExist?.author;

  const isUserExist = await User.findById(userID);
  if (!isUserExist) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'you are not authorized to update this blog',
    );
  }
  const userEmail = isUserExist?.email;
  if (userEmail !== email) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'you are not authorized to update this blog',
    );
  }

  const result = await Blogs.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

// both the admin and the user can delete a blog

export const blogService = {
  createBlog,
  updateABlog,
};
