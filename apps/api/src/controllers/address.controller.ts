import { Request, Response } from 'express';
import prisma from '@/prisma';

export class AddressController {
  async getAdress(req: Request, res: Response) {
    const dataUser = req.dataUser;
    try {
      const address = await prisma.user_Address.findMany({
        where: { user_id: dataUser.id },
      });

      if (address.length === 0) {
        return res.status(400).json({ error: 'Address not found' });
      }
      return res.status(200).send(address);
    } catch (error) {
      console.error('Error get Address', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
