import { Request, Response } from 'express';
import prisma from '@/prisma';
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'arashi48',
  database: 'grocery',
});

export class TransactionController {
  async createTransaction(req: Request, res: Response) {
    const dataUser = req.dataUser;
    const { orderDetails, shipmentDetails, paymentDetails } = req.body;
    try {
      const transaction = await prisma.$transaction(async (tx) => {
        for (const product of orderDetails.products) {
          //Pengecekan Stok
          const inventory = await tx.product_Inventory.findFirst({
            where: {
              product_id: product.product_id,
              store_id: shipmentDetails.store_id,
            },
          });
          if (!inventory || inventory.quantity < product.quantity) {
            throw new Error(
              `Stok tidak mencukupi untuk produk dengan ID ${product.product_id}`,
            );
          }
        }

        //Perhitungan total
        let total = orderDetails.total;
        // Pemakaian Voucher
        if (orderDetails.voucherId) {
          const voucher = await prisma.voucher.findUnique({
            where: {
              id: orderDetails.voucherId,
            },
          });

          if (!voucher) {
            throw new Error(
              `Voucher dengan ID ${orderDetails.voucherId} tidak ditemukan`,
            );
          }
          // Pengecekan apakah voucher sudah kedaluwarsa
          if (voucher.expired_at <= new Date()) {
            throw new Error('Voucher sudah kedaluwarsa');
          }
          let voucherDiscount = 0;
          // Jika voucher terkait dengan produk tertentu
          if (voucher.product_id) {
            const product = orderDetails.products.find(
              (product: { product_id: number }) =>
                product.product_id === voucher.product_id,
            );
            if (!product) {
              throw new Error(
                `Produk dengan ID ${voucher.product_id} tidak ditemukan dalam keranjang`,
              );
            }
            if (voucher.type === 'Amount') {
              voucherDiscount = Number(voucher.amount);
            } else if (voucher.type === 'Percentage') {
              voucherDiscount =
                (Number(voucher.amount) / 100) *
                (product.price * product.quantity);
            }
            product.price -= voucherDiscount / product.quantity;
            total -= voucherDiscount;
          } else {
            if (voucher.type === 'Amount') {
              voucherDiscount = Number(voucher.amount);
            } else if (voucher.type === 'Percentage') {
              voucherDiscount = (Number(voucher.amount) / 100) * total;
            }
            total -= voucherDiscount;
          }
          await prisma.voucher.update({
            where: {
              id: orderDetails.voucherId,
            },
            data: {
              limit_usage: {
                decrement: 1,
              },
            },
          });
        }
        total = Math.max(total, 0);
        total += shipmentDetails.amount;

        const shipment = await tx.shipment.create({
          data: {
            address_id: shipmentDetails.address_id,
            store_id: shipmentDetails.store_id,
            type: shipmentDetails.type,
            amount: Number(shipmentDetails.amount),
          },
        });

        const order = await tx.orders.create({
          data: {
            user_id: dataUser.id,
            shipment_id: shipment.id,
            total: total,
            voucher_id: orderDetails.voucherId ? orderDetails.voucherId : null,
          },
        });

        let payment;
        if (paymentDetails.method === 'Payment_Gateway') {
          // Proses pembayaran melalui gateway pembayaran
        } else {
          const now = new Date();
          const formattedDate = now
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, '');
          const invoiceNumber = `INV-${formattedDate}-${order.id}`;
          const expiredAt = new Date(now.getTime() + 60 * 60 * 1000);
          payment = await tx.payment.create({
            data: {
              invoice: invoiceNumber,
              user_id: dataUser.id,
              order_id: order.id,
              total: total,
              status: 'pending',
              method: paymentDetails.method,
              expired_at: expiredAt,
            },
          });
        }
        for (const product of orderDetails.products) {
          await tx.order_Item.create({
            data: {
              order_id: order.id,
              product_id: product.product_id,
              store_id: shipmentDetails.store_id,
              quantity: product.quantity,
            },
          });

          const inventory = await tx.product_Inventory.findFirst({
            where: {
              product_id: product.product_id,
              store_id: shipmentDetails.store_id,
            },
          });

          if (inventory) {
            await tx.product_Inventory.update({
              where: {
                id: inventory.id,
              },
              data: {
                quantity: {
                  decrement: product.quantity,
                },
              },
            });

            await tx.stocklog.create({
              data: {
                inventory_id: inventory.id,
                typeLog: 'Reduction',
              },
            });
          } else {
            throw new Error(
              `Inventory not found for product ID ${product.product_id} and store ID ${shipmentDetails.store_id}`,
            );
          }
        }
        await tx.cart.deleteMany({
          where: { user_id: dataUser.id },
        });

        return {
          order: order,
          payment: payment || null,
        };
      });

      const newOrderId = transaction.order.id;
      const newPaymentId = transaction.payment ? transaction.payment.id : null;

      const createEventQuery = `
      CREATE EVENT change_status_event_${newOrderId}
      ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 10 SECOND
      DO
      BEGIN
          -- Mengubah status pesanan menjadi 'Cancelled' jika masih 'Pending'
          UPDATE orders 
          SET status = 'Cancelled' 
          WHERE status = 'Pending' AND id = ${newOrderId};

          -- Mengubah status pembayaran menjadi 'Cancelled' jika masih 'Pending'
          UPDATE payment 
          SET status = 'Cancelled' 
          WHERE status = 'Pending' AND id = ${newPaymentId};

          -- Pengecekan status pesanan sebelum membuat entri log stok
          IF (SELECT status FROM orders WHERE id = ${newOrderId}) = 'Cancelled' THEN
                -- Mengembalikan quantity pada product_inventory jika pesanan dibatalkan
                UPDATE product_inventory AS pi
                SET pi.quantity = pi.quantity + (
                  SELECT SUM(oi.quantity) 
                  FROM order_item AS oi
                  WHERE oi.product_id = pi.product_id
                  AND oi.store_id = pi.store_id
                  AND oi.order_id = ${newOrderId}
                )
                WHERE pi.product_id IN (
                  SELECT DISTINCT oi.product_id 
                  FROM order_item AS oi
                  WHERE oi.order_id = ${newOrderId}
                );
              -- Buat entri log stok
              INSERT INTO stocklog (inventory_id, typeLog, updatedAt)
              SELECT pi.id, 'Addition', NOW()
              FROM product_inventory AS pi
              WHERE pi.product_id IN (${orderDetails.products
                .map((product: { product_id: number }) => product.product_id)
                .join(',')})
              AND pi.store_id = ${shipmentDetails.store_id};
          END IF;
      END;`;

      connection.query(createEventQuery, (err) => {
        if (err) {
          console.error('Error creating event scheduler:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Event scheduler created successfully');
      });

      return res.status(200).json(transaction);
    } catch (error) {
      console.error('Error creating transaction:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
