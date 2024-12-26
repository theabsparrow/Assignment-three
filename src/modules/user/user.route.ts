import { Router } from 'express';
import { userController } from './user.controller';
import { userValidation } from './user.validation';
import validateRequest from '../../middlewire/validateRequest';
import auth from '../../middlewire/auth';
import { USER_ROLE } from './user.constant';

const router = Router();

// user creation route with the role 'user
router.post(
  '/register',
  validateRequest(userValidation.userValidationSchema),
  userController.createUser,
);

// admin creation route with the role 'admin
router.post(
  '/register-admin',
  validateRequest(userValidation.userValidationSchema),
  userController.createAdmin,
);

//the route where user and admin both can update their name and email
router.patch(
  '/update-user/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(userValidation.updateUserValidationSchema),
  userController.updateUserInfo,
);

// the route where admin can see all the user info from the database
router.get('/getAllUsers', auth(USER_ROLE.admin), userController.getAllUsers);
// the route where admin can see a certain user info from the database
router.get('/getUser/:id', auth(USER_ROLE.admin), userController.getSingleUSer);

// the route where admin can block a user
router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  userController.blockUser,
);

export const userRouter = router;
