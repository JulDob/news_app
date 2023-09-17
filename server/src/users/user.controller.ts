import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import Exception from '../common/Exception';
import UserDTO from './dto/user.dto';
import config from '../config';
import { User } from '@prisma/client';
import { prisma } from '../common/db-client.connect';

export interface ITokenPayload {
  user_id: User['id'];
  user_role: User['role'];
  email: User['email'];
}

const makeTokenPayload = (user: User) => ({
  user_id: user.id,
  user_role: user.role,
  email: user.email,
});

const makeAccessToken = (payload: ITokenPayload) => {
  const accessTokenLife = '1h';

  return jwt.sign(payload, config.tokenKey as Secret, {
    expiresIn: accessTokenLife,
  });
};

const makeRefreshToken = (payload: ITokenPayload) => {
  const refreshTokenLife = '10d';

  return jwt.sign(payload, config.refreshTokenKey as Secret, {
    expiresIn: refreshTokenLife,
  });
};

export const getAccessTokenByRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return next(new Exception(404, 'Token does not exist'));
    }

    const decoded = jwt.verify(refreshToken, config.refreshTokenKey as Secret) as ITokenPayload;

    const payload = {
      user_id: decoded.user_id,
      user_role: decoded.user_role,
      email: decoded.email,
    };

    const accessToken = makeAccessToken(payload);

    res.status(200).json({ accessToken });
  } catch (err: any) {
    return next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new Exception(400, errors.array()[0].msg));
    }

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return next(new Exception(404, 'User is not exist'));
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = makeTokenPayload(user);
      const accessToken = makeAccessToken(payload);
      const refreshToken = makeRefreshToken(payload);

      res.cookie('refresh_token', refreshToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
        maxAge: 1000 * 60 * 60 * 24 * 10,
        httpOnly: true,
      });

      return res.status(200).json({ user: new UserDTO(user), accessToken });
    } else {
      return next(new Exception(400, 'Invalid Credentials'));
    }
  } catch (err: any) {
    return next(err);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(500);
      return res.json({ error: errors.array()[0].msg });
      //   return next(new Exception(400, errors.array()[0].msg));
    }

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return next(new Exception(409, 'User already exists'));
    }

    const salt = await bcrypt.genSalt(10);
    const hasedPasswors = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        email,
        password: hasedPasswors,
      },
    });

    return res.status(201).json();
  } catch (err: any) {
    return next(err);
  }
};

export const getMe = async (
  req: Request & { user?: ITokenPayload },
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return next(new Exception(404, 'User not found'));
    }
    const user = await prisma.user.findUnique({ where: { id: req.user.user_id } });

    if (!user) {
      return next(new Exception(404, 'User not found'));
    }

    return res.status(200).json({ user: new UserDTO(user) });
  } catch (err: any) {
    return next(err);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new Exception(400, errors.array()[0].msg));
    }

    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return next(new Exception(404, 'User not found'));
    }

    const payload = makeTokenPayload(user);
    const accessToken = makeAccessToken(payload);

    const url = `http://localhost:3050/restore-password?token=${accessToken}`;

    // TODO: here need to send email
    return res.status(200).send({ url });
  } catch (err) {
    return next(err);
  }
};

export const restorePassword = async (
  req: Request & { user?: ITokenPayload },
  res: Response,
  next: NextFunction,
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new Exception(400, errors.array()[0].msg));
    }

    if (!req.user) {
      return next(new Exception(404, 'User not found'));
    }

    const { password1, password2 } = req.body;

    if (password1 !== password2) {
      return next(new Exception(500, 'Passwords should be equal'));
    }

    const user = await prisma.user.findUnique({ where: { id: req.user.user_id } });

    if (!user) {
      return next(new Exception(404, 'User not found'));
    }

    const salt = await bcrypt.genSalt(10);
    const hasedPasswors = await bcrypt.hash(password1, salt);

    await prisma.user.update({ where: { id: user.id }, data: { password: hasedPasswors } });

    return res.status(204).json();
  } catch (err) {
    return next(err);
  }
};

export const logout = async (
  req: Request & { user?: ITokenPayload },
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return next(new Exception(404, 'User not found'));
    }

    res.clearCookie('refresh_token');

    return res.status(200).json();
  } catch (err) {
    return next(err);
  }
};
