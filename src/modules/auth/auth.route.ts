import { Router } from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../middlewire/validateRequest';
import { authValidation } from './auth.validation';

const router = Router();
router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser,
);

export const authRoute = router;
