import { Router } from 'express';
import { blogsController } from './blogs.controller';
import validateRequest from '../../middlewire/validateRequest';
import { blogValidation } from './blogs.validation';
import auth from '../../middlewire/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(blogValidation.blogValidationSchema),
  blogsController.createBlog,
);

export const blogRouter = router;
