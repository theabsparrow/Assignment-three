import { z } from 'zod';

// the validator for creating a blog
const blogValidationSchema = z.object({
  title: z
    .string({ invalid_type_error: 'title must be string' })
    .min(1, { message: 'title can`t be less than 2 character' })
    .max(40, { message: 'title can`t be more than 40 character' }),
  content: z
    .string({ invalid_type_error: 'content must be string' })
    .min(5, { message: 'content can`t be less than 5 character' }),
});

// the validator for updation a blog
const updateBlogValidationSchema = z.object({
  title: z
    .string({ invalid_type_error: 'title must be string' })
    .min(1, { message: 'title can`t be less than 2 character' })
    .max(40, { message: 'title can`t be more than 40 character' })
    .optional(),
  content: z
    .string({ invalid_type_error: 'content must be string' })
    .min(5, { message: 'content can`t be less than 5 character' })
    .optional(),
});

export const blogValidation = {
  blogValidationSchema,
  updateBlogValidationSchema,
};
