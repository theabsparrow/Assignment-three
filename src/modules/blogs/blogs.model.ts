import { model, Schema } from 'mongoose';
import { TBlog } from './blogs.interface';

const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'title is required'],
    },
    content: {
      type: String,
      trim: true,
      required: [true, 'content is required'],
    },
    author: {
      type: Schema.Types.ObjectId,
      required: [true, 'author ID is required'],
      ref: 'User',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Blogs = model<TBlog>('Blogs', blogSchema);
