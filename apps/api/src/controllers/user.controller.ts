import { Request, Response } from 'express';
import prisma from '@/prisma';

export class UserController {
  async getUserbyId(req: Request, res: Response) {
    const dataUser = req.dataUser;
    try {
      const user = await prisma.user.findFirst({
        where: { id: dataUser.id },
      });

      if (!user) {
        return res.status(404).json({ error: 'user not found' });
      }

      const userDataToSend = {
        user_name: user.user_name,
        email: user.email,
        telephone: user.telephone,
        image: user.image,
        refferal_code: user.refferal_code,
        role: user.role,
      };

      return res.status(200).send(userDataToSend);
    } catch (error) {
      console.error('Error get cart', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
