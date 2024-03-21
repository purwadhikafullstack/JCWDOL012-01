import { NextFunction, Request, Response } from "express";

export class VoucherController {
  async createBogo(req: Request, res: Response, next: NextFunction) {
    try {
      
    } catch (error) {
      return next(error);
    }
  }
}