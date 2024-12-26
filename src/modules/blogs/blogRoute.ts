import { Router } from 'express';
import { blogsController } from './blogs.controller';
import validateRequest from '../../middlewire/validateRequest';
import { blogValidation } from './blogs.validation';
import auth from '../../middlewire/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

// the route where the user with the role 'user' create blogs
router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(blogValidation.blogValidationSchema),
  blogsController.createBlog,
);

// the route where user with the role 'user' update the title and content od a blog
router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(blogValidation.updateBlogValidationSchema),
  blogsController.updateBlog,
);
export const blogRouter = router;
