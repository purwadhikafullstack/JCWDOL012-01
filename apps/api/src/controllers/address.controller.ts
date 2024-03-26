import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';

export class AddressController {
  async getAdress(req: Request, res: Response, next: NextFunction) {
    const dataUser = req.dataUser;
    try {
      const address = await prisma.user_Address.findMany({
        where: { user_id: dataUser.id },
      });

      if (address.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: 'Address not found' });
      }
      return res.status(200).send(address);
    } catch (error) {
      return next(error);
    }
  }
  async updatePrimaryAddress(req: Request, res: Response, next: NextFunction) {
    const { addressId } = req.params;
    try {
      await prisma.user_Address.updateMany({
        where: {
          isPrimary: true,
        },
        data: { isPrimary: false },
      });

      const updateAddress = await prisma.user_Address.update({
        where: { id: Number(addressId) },
        data: { isPrimary: true },
      });

      res.status(200).json(updateAddress);
    } catch (error) {
      return next(error);
    }
  }
}
