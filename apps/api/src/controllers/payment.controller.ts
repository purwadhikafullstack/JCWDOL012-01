import { NextFunction, Request, Response } from 'express';
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

  async UploadProofPayment(req: Request, res: Response) {
    const { paymentId } = req.params;
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No image uploaded' });
      }

      const payment = await prisma.payment.findFirst({
        where: { id: Number(paymentId) },
      });

      if (!payment) {
        return res.status(400).json({ error: 'Payment not Found' });
      } else if (payment.status === 'Cancelled') {
        return res.status(400).json({ error: 'Payment expired' });
      }
      await prisma.$transaction(async (tx) => {
        await tx.payment.update({
          where: { id: Number(paymentId) },
          data: {
            status: 'Confirmation',
            proof_payment: req.file?.filename,
          },
        });
        await tx.orders.update({
          where: { id: payment.order_id },
          data: { status: 'confirmation' },
        });
      });

      return res
        .status(200)
        .send({ success: true, message: 'success update payment' });
    } catch (error) {
      console.error('error update payment', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async confirmPayment(req: Request, res: Response, next: NextFunction) {
    const { paymentId } = req.params;
    try {
      const user = await prisma.user.findFirst({
        where: { id: req.dataUser.id },
      });
      if (user?.role !== 'Store_Admin') {
        return res
          .status(400)
          .json({ message: 'Unauthorized Access: Permission Denied' });
      }
      const payment = await prisma.payment.findFirst({
        where: { id: Number(paymentId) },
      });
      if (!payment) {
        return res.status(400).json({ error: 'Payment not Found' });
      }
      await prisma.payment.update({
        where: { id: Number(paymentId) },
        data: { status: 'Confirmed' },
      });
      await prisma.orders.update({
        where: { id: payment.id },
        data: { status: 'on_process' },
      });
      return res.status(200).json({ message: 'confirm payment success' });
    } catch (error) {}
  }
}
