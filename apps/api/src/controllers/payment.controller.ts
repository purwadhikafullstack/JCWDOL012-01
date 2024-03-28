import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'arashi48',
  database: 'grocery',
});

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

  async checkPaymentProof(req: Request, res: Response, next: NextFunction) {
    const dataUser = req.dataUser;
    const { paymentId } = req.params;
    const { approval_status } = req.body;
    try {
      if (dataUser.role !== 'Store_Admin') {
        return res.status(400).json({ error: 'Not Authorized' });
      }

      if (approval_status === 'approved') {
        const payment = await prisma.payment.update({
          where: { id: Number(paymentId) },
          data: { status: 'Confirmed' },
        });
        await prisma.orders.update({
          where: { id: payment.order_id },
          data: { status: 'on_process' },
        });
      } else {
        const payment = await prisma.payment.update({
          where: { id: Number(paymentId) },
          data: { status: 'pending' },
        });
        const order = await prisma.orders.update({
          where: { id: payment.order_id },
          data: { status: 'pending' },
          include: {
            shipment: { select: { store_id: true } },
            order_Items: true,
          },
        });

        const createEventQuery = `
        CREATE EVENT change_status_event_${payment.order_id}
        ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 20 SECOND
        DO
        BEGIN
            -- Mengubah status pesanan menjadi 'Cancelled' jika masih 'Pending'
            UPDATE orders 
            SET status = 'cancelled' 
            WHERE status = 'pending' AND id = ${payment.order_id};
  
            -- Mengubah status pembayaran menjadi 'Cancelled' jika masih 'Pending'
            UPDATE payment 
            SET status = 'Cancelled' 
            WHERE status = 'Pending' AND id = ${Number(paymentId)};
  
            -- Pengecekan status pesanan sebelum membuat entri log stok
            IF (SELECT status FROM orders WHERE id = ${
              payment.order_id
            }) = 'Cancelled' THEN
                  -- Mengembalikan quantity pada product_inventory jika pesanan dibatalkan
                  UPDATE product_inventory AS pi
                  SET pi.quantity = pi.quantity + (
                    SELECT SUM(oi.quantity) 
                    FROM order_item AS oi
                    WHERE oi.product_id = pi.product_id
                    AND oi.store_id = ${order.shipment.store_id}
                    AND oi.order_id = ${payment.order_id}
                  )
                  WHERE pi.product_id IN (
                    SELECT DISTINCT oi.product_id 
                    FROM order_item AS oi
                    WHERE oi.order_id = ${payment.order_id}
                  );
                -- Buat entri log stok
                INSERT INTO stocklog (inventory_id, typeLog, updatedAt)
                SELECT pi.id, 'Addition', NOW()
                FROM product_inventory AS pi
                WHERE pi.product_id IN (${order.order_Items
                  .map((product: { product_id: number }) => product.product_id)
                  .join(',')}) 
                AND pi.store_id = ${order.shipment.store_id};
            END IF;
        END;`;
        connection.query(createEventQuery, (err) => {
          if (err) {
            console.error('Error creating event scheduler:', err);
            return res.status(500).json({ error: 'Internal server error' });
          }
          console.log('Event scheduler created successfully');
        });
      }
      return res.status(200).json({ message: 'success update payment' });
    } catch (error) {
      next(error);
    }
  }

  async webhook(req: Request, res: Response, next: NextFunction) {
    const { order_id, transaction_status } = req.body;

    try {
      await prisma.$transaction(async (tx) => {
        if (transaction_status === 'settlement') {
          const payment = await tx.payment.update({
            where: {
              invoice: order_id,
            },
            data: {
              status: 'Confirmation',
            },
          });
          await tx.orders.update({
            where: { id: payment.order_id },
            data: { status: 'on_process' },
          });
          res
            .status(200)
            .json({ message: 'payment status updated successfully' });
        } else if (
          transaction_status === 'cancel' ||
          transaction_status === 'expire'
        ) {
          const payment = await tx.payment.update({
            where: {
              invoice: order_id,
            },
            data: {
              status: 'Cancelled',
            },
          });
          const order = await tx.orders.update({
            where: { id: payment.order_id },
            data: { status: 'cancelled' },
            include: { order_Items: true },
          });
          if (order) {
            for (const orderItem of order.order_Items) {
              const productInventory = await prisma.product_Inventory.findFirst(
                {
                  where: {
                    product_id: orderItem.product_id,
                    store_id: orderItem.store_id,
                  },
                },
              );

              if (productInventory) {
                await prisma.product_Inventory.update({
                  where: { id: productInventory.id },
                  data: {
                    quantity: {
                      increment: orderItem.quantity,
                    },
                  },
                });
              }
              await tx.stocklog.create({
                data: {
                  inventory: {
                    connect: {
                      id: orderItem.store_id,
                    },
                  },
                  typeLog: 'Addition',
                  quantity: orderItem.quantity,
                },
              });
            }
          }
          res.status(200).json({ message: 'payment cancelled' });
        }
      });
    } catch (error) {
      next(error);
    }
  }
}
