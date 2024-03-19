import { Request, Response } from 'express';
import prisma from '@/prisma';

export class OrderController {
  async getOrder(req: Request, res: Response) {
    const dataUser = req.dataUser;
    try {
      const order = await prisma.orders.findMany({
        where: { user_id: dataUser.id },
      });

      if (order.length === 0) {
        return res.status(400).json({ error: 'Address not found' });
      }
      return res.status(200).send(order);
    } catch (error) {
      console.error('Error get Address', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
