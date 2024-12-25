import { TBlogBody } from './blogs.interface';
import { Blogs } from './blogs.model';

const createBlog = async (payload: TBlogBody) => {
  const result = await Blogs.create(payload);
  return result;
};

export const blogService = {
  createBlog,
};
