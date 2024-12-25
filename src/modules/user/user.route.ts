import { Router } from 'express';
import { userController } from './user.controller';
import { userValidation } from './user.validation';
import validateRequest from '../../middlewire/validateRequest';
import auth from '../../middlewire/auth';
import { USER_ROLE } from './user.constant';

const router = Router();

router.post(
  '/register',
  validateRequest(userValidation.userValidationSchema),
  userController.createUser,
);
router.post(
  '/register-admin',
  validateRequest(userValidation.userValidationSchema),
  userController.createAdmin,
);
router.patch(
  '/update-user/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(userValidation.updateUserValidationSchema),
  userController.updateUserInfo,
);

router.get('/getAllUsers', auth(USER_ROLE.admin), userController.getAllUsers);
router.get('/getUser/:id', auth(USER_ROLE.admin), userController.getSingleUSer);

router.patch(
  '/users/:userId/block',
  auth(USER_ROLE.admin),
  userController.blockUser,
);

export const userRouter = router;
