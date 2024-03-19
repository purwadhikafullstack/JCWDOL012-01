import { Request, Response } from 'express';
import prisma from '@/prisma';

export class PaymentController {
  async getPayment(req: Request, res: Response) {
    const dataUser = req.dataUser;
    try {
      const payment = await prisma.payment.findMany({
        where: { user_id: dataUser.id },
      });

      if (payment.length === 0) {
        return res.status(400).json({ error: 'Address not found' });
      }
      return res.status(200).send(payment[payment.length - 1]);
    } catch (error) {
      console.error('Error get Address', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateStatusPayment(req: Request, res: Response) {
    const { paymentId } = req.params;
    try {
      const payment = await prisma.payment.findFirst({
        where: { id: Number(paymentId) },
      });

      if (!payment) {
        return res.status(400).json({ error: 'Payment not Found' });
      } else if (payment.status === 'Cancelled') {
        return res.status(400).json({ error: 'Payment expired' });
      }
      await prisma.$transaction(async (tx) => {
        const updateStatusPayment = await tx.payment.update({
          where: { id: Number(paymentId) },
          data: { status: 'Confirmation' },
        });
        const updateStatusOrder = await tx.orders.update({
          where: { id: payment.order_id },
          data: { status: 'Confirmation' },
        });
      });

      return res.status(200).send('Success');
    } catch (error) {
      console.error('error update payment', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
