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

// get all blogs service
const getAllBlogs = async (query: Record<string, unknown>) => {
  const queryObject = { ...query };
  // blog searching
  const blogSearchbaleFields = ['title', 'content'];
  const search = query?.search || '';
  const searchQuery = Blogs.find({
    $or: blogSearchbaleFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    })),
  });
  // blog filtering
  const excludeFields = ['search', 'sortBy', 'sortOrder'];
  excludeFields.forEach((ele) => delete queryObject[ele]);
  const filterQuery = searchQuery.find(queryObject).populate('author');
  // blog sorting
  let sortString = '-createdAt';
  if (query?.sortBy) {
    const sortOrder = query?.sortOrder === 'desc' ? '-' : '';
    sortString = `${sortOrder}${query.sortBy}`;
  }
  const result = await filterQuery.sort(sortString);
  return result;
};

// get a single blog by login
const getSingleBlog = async (id: string) => {
  const result = await Blogs.findById(id).populate('author');
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'this blog dosn`t exist');
  }
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

// user can delete his own blog
const deleteACertainBlog = async (id: string, email: string) => {
  const isBlogExist = await Blogs.findById(id);
  if (!isBlogExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'this blog does not exists');
  }
  const userID = isBlogExist.author;
  const isUserExists = await User.findById(userID);
  const userEmail = isUserExists?.email;
  if (userEmail !== email) {
    throw new AppError(StatusCodes.FORBIDDEN, 'you can`t delete this blog');
  }
  await Blogs.findByIdAndDelete(id);
  return {};
};

// admin can delete any blog
const deleteBlogByAdmin = async (id: string) => {
  const isBlogExist = await Blogs.findById(id);
  if (!isBlogExist) {
    throw new AppError(StatusCodes.NOT_FOUND, 'this blog does not exists');
  }
  await Blogs.findByIdAndDelete(id);
  return {};
};
export const blogService = {
  createBlog,
  updateABlog,
  deleteACertainBlog,
  deleteBlogByAdmin,
  getAllBlogs,
  getSingleBlog,
};
