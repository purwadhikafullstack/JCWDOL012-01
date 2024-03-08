import { Request, Response } from 'express';
import prisma from '@/prisma';
import { sign } from 'jsonwebtoken';

export class AuthController {
  async register(req: Request, res: Response) {
    const { user_name, email } = req.body;

    const newUser = await prisma.user.create({
      data: { user_name, email },
    });

    return res.status(201).send(newUser);
  }

  async loginUser(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: req.body.email },
      });

      const jwtToken = sign(
        { id: user?.id, role: user?.role, email: user?.email },
        'secretkey',
      );

      return res.status(200).send({
        token: jwtToken,
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: error.message,
      });
    }
  }
}
