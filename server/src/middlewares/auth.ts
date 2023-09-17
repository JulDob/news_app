import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import Exception from '../common/Exception';
import { ITokenPayload } from '../users/user.controller';
import config from '../config';
import { User } from '@prisma/client';

const auth =
  (roles: User['role'][] = []) =>
  (req: Request & { user?: ITokenPayload }, res: Response, next: NextFunction) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
      return next(new Exception(403, 'A token is required for authentication'));
    }
    try {
      const decoded = jwt.verify(token, config.tokenKey as Secret) as ITokenPayload;
      if (roles.length && !roles.includes(decoded.user_role)) {
        return next(new Exception(403, 'No permissions'));
      }
      req.user = decoded;
    } catch (err) {
      return next(new Exception(401, 'Invalid Token'));
    }
    return next();
  };

export default auth;
