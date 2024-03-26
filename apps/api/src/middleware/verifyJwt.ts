import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getEnv } from '@/helpers/environment';

declare global {
  namespace Express {
    interface Request {
      dataUser: any;
    }
  }
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return res.status(400).send('Token not found');
    }
    const verifiedToken: any = verify(token, getEnv(process.env.SECRET_KEY));

    req.dataUser = verifiedToken;
    next();
  } catch (error) {
    return res.status(400).send('Token error');
  }
};
