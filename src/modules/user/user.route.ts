import { Router } from 'express';
import { userController } from './user.controller';

const router = Router();

router.post('/register', userController.createUser);
router.post('/register-admin', userController.createAdmin);

export const userRouter = router;
