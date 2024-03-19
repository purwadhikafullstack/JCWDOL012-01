import { Request, Response } from 'express';
import prisma from '@/prisma';
import { getDistance } from 'geolib';

export class VoucherController {
  async getVoucher(req: Request, res: Response) {
    const dataUser = req.dataUser;
    try {
      const now = new Date();
      const address = await prisma.user_Address.findFirst({
        where: { user_id: dataUser.id, isPrimary: true },
      });
      const stores = await prisma.store.findMany();
      if (address) {
        const nearestStores = stores.filter((store) => {
          const distance = getDistance(
            {
              latitude: parseFloat(store.latitude.toString()),
              longitude: parseFloat(store.longitude.toString()),
            },
            {
              latitude: parseFloat(address.latitude.toString()),
              longitude: parseFloat(address.longitude.toString()),
            },
          );
          return distance <= 15000;
        });
        const nearestStoreId =
          nearestStores.length > 0 ? nearestStores[0].id : undefined;

        const carts = await prisma.cart.findMany({
          where: { user_id: dataUser.id },
        });

        const productIds = carts.map((cart) => cart.product_id);

        const vouchers = await prisma.voucher.findMany({
          where: {
            AND: [
              {
                store_id: nearestStoreId,
              },
              {
                OR: [
                  {
                    product_id: { in: productIds },
                  },
                  {
                    product_id: null,
                  },
                ],
              },
              {
                expired_at: { gte: now },
              },
              {
                limit_usage: { gt: 0 },
              },
            ],
          },
        });

        if (vouchers.length === 0) {
          return res.status(400).json({ error: 'Voucher not found' });
        }
        return res.status(200).send(vouchers);
      }
    } catch (error) {
      console.error('Error get voucher', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
