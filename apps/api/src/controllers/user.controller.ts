import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";

export class UserController {
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await prisma.user.findMany({});
      return res.status(200).json({ success: true, results: users });
    } catch (error) {
      return next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) return res.status(404).json({ success: false, message: 'User not found' });

      return res.status(200).json({ success: true, results: user });
    } catch (error) {
      return next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const existingUser = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!existingUser) return res.status(400).json({ success: false, message: 'User not found' });

      const updatedUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: { role }
      });

      return res.status(200).json({ success: true, results: updatedUser });
    } catch (error) {
      return next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const existingUser = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!existingUser) return res.status(400).json({ success: false, message: 'User not found' });

      await prisma.user.delete({ where: { id: existingUser.id } });

      return res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      return next(error);
    }
  }
}