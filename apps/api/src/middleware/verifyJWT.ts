import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

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
    const token: any = req.header('Authorization')?.split(' ')[1];
    if (token) {
      return res.status(400).send('Token not found');
    }
    const verifyToken: any = verify(token, 'Secret123');

    req.dataUser = verifyToken;
    next();
  } catch (error) {
    return res.status(400).send('Token Error');
  }
};
