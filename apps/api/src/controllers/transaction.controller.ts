import { Request, Response, text } from 'express';
import prisma from '@/prisma';

export class TransactionController {
  async createTransaction(req: Request, res: Response) {
    const dataUser = req.dataUser;
    const { orderDetails, shipmentDetails, paymentDetails } = req.body;

    try {
      const transaction = await prisma.$transaction(async (tx) => {
        let total = orderDetails.total + shipmentDetails.shippingCost;
        if (orderDetails.voucherId) {
          const voucher = await prisma.voucher.findUnique({
            where: {
              id: orderDetails.voucherId,
            },
          });

          if (voucher) {
            if (voucher.product_id) {
              const product = orderDetails.products.find(
                (product: { product_id: number }) =>
                  product.product_id === voucher.product_id,
              );

              if (product) {
                const initialTotal = orderDetails.total;

                if (voucher.type === 'Amount') {
                  product.unitPrice -= Number(voucher.amount);
                } else if (voucher.type === 'Percentage') {
                  const discount =
                    (Number(voucher.amount) / 100) * product.unitPrice;
                  product.unitPrice -= discount;
                }

                const updatedTotal = orderDetails.products.reduce(
                  (
                    acc: number,
                    product: { unitPrice: number; quantity: number },
                  ) => {
                    return acc + product.unitPrice * product.quantity;
                  },
                  0,
                );

                orderDetails.total = updatedTotal;

                orderDetails.total -= initialTotal - updatedTotal;
              }
            } else {
              if (voucher.type === 'Amount') {
                orderDetails.total -= Number(voucher.amount);
              } else if (voucher.type === 'Percentage') {
                const discount =
                  (Number(voucher.amount) / 100) * orderDetails.total;
                orderDetails.total -= discount;
              }
            }
          }
        }
        total = Math.max(total, 0);

        const shipment = await tx.shipment.create({
          data: {
            address_id: shipmentDetails.userAdressId,
            store_id: shipmentDetails.storeId,
            amount: shipmentDetails.shippingcost,
            type: shipmentDetails.shipmentType,
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

        if (paymentDetails.method === 'Payment_Gateway') {
          // Jika metode pembayaran adalah 'Payment_Gateway', lakukan proses pembayaran melalui midtrans
          // Misalnya, lakukan proses pembayaran ke Midtrans di sini
        } else {
          // Jika metode pembayaran adalah lainnya, buat entri pembayaran biasa
          const now = new Date(); // Waktu saat ini
          const expiredAt = new Date(now.getTime() + 60 * 60 * 1000);
          const payment = await tx.payment.create({
            data: {
              invoice: '1234',
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
              product_id: product.productId,
              store_id: product.storeId,
              quantity: product.quantity,
            },
          });

          const inventory = await tx.product_inventory.findFirst({
            where: {
              product_id: product.productId,
              store_id: product.storeId,
            },
          });

          if (inventory) {
            await tx.product_inventory.update({
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
                typeLog: 'Reduction', // Log untuk pengurangan stok
              },
            });
          } else {
            throw new Error(
              `Inventory not found for product ID ${product.productId} and store ID ${product.storeId}`,
            );
          }
        }
      });

      return res.status(200).json(transaction);
    } catch (error) {
      console.error('Error fetching cart:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
