import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { Order_Status } from '@prisma/client';

export class OrderController {
  async getOrder(req: Request, res: Response) {
    const dataUser = req.dataUser;
    const status = req.query.status as Order_Status;
    const invoice = req.query.invoice as string;
    const pageSize = 6;
    const pageNumber = parseInt((req.query.page as string) || '1');
    const skipAmount = (pageNumber - 1) * pageSize;
    try {
      let whereClause: any = {
        user_id: dataUser.id,
      };
      if (status) {
        whereClause.status = status;
      }
      if (invoice) {
        whereClause.payment = {
          some: {
            invoice: invoice ? { contains: invoice } : undefined,
          },
        };
      }
      const order = await prisma.orders.findMany({
        where: whereClause,
        skip: skipAmount,
        take: pageSize,
        orderBy: {
          id: 'desc',
        },
        include: {
          shipment: {
            select: {
              type: true,
              amount: true,
              address: {
                select: {
                  label: true,
                  street: true,
                  city: true,
                  user: {
                    select: {
                      user_name: true,
                    },
                  },
                },
              },
            },
          },
          payment: {
            select: {
              id: true,
              method: true,
              invoice: true,
              expired_at: true,
            },
          },
          order_Items: {
            select: {
              quantity: true,
              product: {
                select: {
                  name: true,
                  price: true,
                  images: {
                    select: {
                      url: true,
                    },
                    orderBy: {
                      id: 'asc',
                    },
                    take: 1,
                  },
                },
              },
            },
          },
        },
      });

      if (order.length === 0) {
        return res.status(400).json({ error: 'Orders not found' });
      }
      const modifiedOrders = order.map((orderItem) => {
        const modifiedOrderItem = {
          ...orderItem,
          order_Items: orderItem.order_Items.map((item) => ({
            ...item,
            product: {
              ...item.product,
              images: item.product.images.map((image) => ({
                ...image,
                url: `http://${req.get('host')}/image/${image.url}`,
              })),
            },
          })),
        };
        return modifiedOrderItem;
      });
      return res.status(200).send({ succes: true, result: modifiedOrders });
    } catch (error) {
      console.error('Error get Address', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  async cancelOrder(req: Request, res: Response, next: NextFunction) {
    const { orderId } = req.params;
    const dataUser = req.dataUser;
    try {
      const order = await prisma.orders.findFirst({
        where: { id: Number(orderId) },
        include: { order_Items: true },
      });

      if (!order) {
        return res.status(400).json({ error: 'Order not Found' });
      }

      if (dataUser.role === 'Store_Admin') {
        if (order.status === 'shipped' || order.status === 'confirmed') {
          return res
            .status(403)
            .json({ error: 'Unauthorized: Order Cannot Be Cancelled' });
        }
      } else {
        if (order.status !== 'pending') {
          return res
            .status(403)
            .json({ error: 'Unauthorized: Order Cannot Be Cancelled' });
        }
      }

      await prisma.$transaction(async (tx) => {
        await tx.payment.update({
          where: { order_id: Number(orderId) },
          data: { status: 'Cancelled' },
        });

        await tx.orders.update({
          where: { id: Number(orderId) },
          data: { status: 'cancelled' },
        });

        if (order) {
          for (const orderItem of order.order_Items) {
            const productInventory = await prisma.product_Inventory.findFirst({
              where: {
                product_id: orderItem.product_id,
                store_id: orderItem.store_id,
              },
            });

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
                typeLog: 'Reduction',
              },
            });
          }
        }
      });
      return res
        .status(200)
        .send({ success: true, message: 'success cancel payment' });
    } catch (error) {
      next(error);
    }
  }
}
