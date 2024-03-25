import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      dataUser: any;
    }
  }
}

export const verifySuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req?.dataUser?.role !== 'Super_Admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized on this endpoint' });
    }
    next();
  } catch (error) {
    return res.status(400).send('Token error');
  }
};