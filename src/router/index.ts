import { Router } from 'express';
import { userRouter } from '../modules/user/user.route';
import { blogRouter } from '../modules/blogs/blogRoute';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
