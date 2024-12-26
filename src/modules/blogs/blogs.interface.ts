import { Types } from 'mongoose';
// interface of a blog
export type TBlog = {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
};

// interface of a blog data that comes from the client
export type TBlogBody = {
  title: string;
  content: string;
};
