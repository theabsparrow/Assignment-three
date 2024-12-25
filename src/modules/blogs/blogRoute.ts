import { Router } from 'express';
import { blogsController } from './blogs.controller';
import validateRequest from '../../middlewire/validateRequest';
import { blogValidation } from './blogs.validation';

const router = Router();

router.post(
  '/',
  validateRequest(blogValidation.blogValidationSchema),
  blogsController.createBlog,
);

export const blogRouter = router;
