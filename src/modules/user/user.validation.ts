import { z } from 'zod';

// user validation
const userValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'name must be string',
    })
    .min(2, { message: 'name can`t be less than 2 character' })
    .max(30, { message: 'name can`t be more than 30 character' }),
  email: z.string().email(),
  password: z
    .string({
      invalid_type_error: 'password must be string',
    })
    .max(20, { message: 'password can`t be more than 20 character' })
    .min(6, { message: 'password can`t be less than 6 character' }),
});

// user validation for update the info
const updateUserValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'name must be string',
    })
    .min(2, { message: 'name can`t be less than 2 character' })
    .max(30, { message: 'name can`t be more than 30 character' })
    .optional(),
  email: z.string().email().optional(),
});

export const userValidation = {
  userValidationSchema,
  updateUserValidationSchema,
};
