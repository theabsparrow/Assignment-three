import { Router } from 'express';
import { userRouter } from '../modules/user/user.route';
import { blogRouter } from '../modules/blogs/blog.Route';
import { authRoute } from '../modules/auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRouter,
  },
  {
    path: '/admin',
    route: userRouter,
  },
  {
    path: '/blogs',
    route: blogRouter,
  },
  {
    path: '/admin',
    route: blogRouter,
  },
  {
    path: '/auth',
    route: authRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
