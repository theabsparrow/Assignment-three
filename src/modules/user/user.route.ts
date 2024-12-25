import { Router } from 'express';
import { userController } from './user.controller';
import { userValidation } from './user.validation';
import validateRequest from '../../middlewire/validateRequest';

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
  validateRequest(userValidation.updateUserValidationSchema),
  userController.updateUserInfo,
);

router.get('/getAllUsers', userController.getAllUsers);
router.get('/getUser/:id', userController.getSingleUSer);
router.patch('/users/:userId/block', userController.blockUser);

export const userRouter = router;
