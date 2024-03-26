import prisma from '@/prisma';
import { Request } from 'express';
import { Order_Status } from '@prisma/client';

export class OrderService {
  async getOrder(dataUser: any, req: Request) {
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

      return order;
    } catch (error) {
      throw error;
    }
  }
}
