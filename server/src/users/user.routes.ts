import express from 'express';
import { body, check } from 'express-validator';
import * as controller from './user.controller';
import auth from '../middlewares/auth';

const userRoutes = express.Router();

userRoutes.get('/token', check('refreshToken').exists(), controller.getAccessTokenByRefreshToken);

userRoutes.post(
  '/login',
  body('email').isEmail().withMessage('e-mail address is invalid'),
  body('password').isLength({ min: 8 }).withMessage('must be at least 8 chars long'),
  controller.login,
);

userRoutes.post(
  '/register',
  body('email').isEmail().withMessage('e-mail address is invalid'),
  body('password').isLength({ min: 8 }).withMessage('must be at least 8 chars long'),
  controller.register,
);

userRoutes.post(
  '/forgot-password',
  body('email').isEmail().withMessage('e-mail address is invalid'),
  controller.forgotPassword,
);

userRoutes.post(
  '/restore-password',
  body('password1').isLength({ min: 8 }).withMessage('must be at least 8 chars long'),
  body('password2').isLength({ min: 8 }).withMessage('must be at least 8 chars long'),
  auth(['admin', 'manager', 'user']),
  controller.restorePassword,
);

userRoutes.get('/me', auth(['admin', 'manager', 'user']), controller.getMe);

userRoutes.get('/logout', auth(['admin', 'manager', 'user']), controller.logout);

export default userRoutes;
