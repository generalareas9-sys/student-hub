import { Router } from 'express';
import {
  register,
  login,
  getMe,
  logout,
  changePassword,
  forgotPassword,
  registerSchema,
  loginSchema,
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/me', authenticate, getMe);
router.post('/logout', authenticate, logout);
router.post('/change-password', authenticate, changePassword);
router.post('/forgot-password', forgotPassword);

export default router;
