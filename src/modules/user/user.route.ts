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

export const userRouter = router;
