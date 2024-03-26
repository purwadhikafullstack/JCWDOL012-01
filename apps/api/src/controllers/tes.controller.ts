import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import prisma from '@/prisma'; // Mengimpor instansi Prisma dari file konfigurasi Prisma Anda

export class TesController {
  async createTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const { paymentType, orderId, grossAmount, bank } = req.body;

      const requestData = {
        payment_type: 'bank_transfer',
        transaction_details: {
          order_id: 'order-3',
          gross_amount: 44000,
        },
        bank_transfer: {
          bank: 'bca',
        },
      };

      const authHeader = `Basic ${Buffer.from(
        'SB-Mid-server-Ro1-xtuXIa1sQyztcpMN0Uec',
      ).toString('base64')}`;

      const response = await axios.post(
        'https://api.sandbox.midtrans.com/v2/charge',
        requestData,
        {
          headers: {
            Accept: 'application/json',
            Authorization: authHeader,
            'Content-Type': 'application/json',
          },
        },
      );

      await prisma.test.create({
        data: {
          title: `order-3`,
          status: 'pending',
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      next(error);
    }
  }

  async updateTestStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { order_id, transaction_status } = req.body;

      // Cek apakah status transaksi adalah "settlement"
      if (transaction_status === 'settlement') {
        // Jika status transaksi "settlement", perbarui status di tabel Test menjadi "confirmation"
        await prisma.test.update({
          where: {
            title: order_id,
          },
          data: {
            status: 'confimation',
          },
        });

        res.status(200).json({ message: 'Test status updated successfully' });
      } else {
        // Jika status transaksi bukan "settlement", kembalikan respon dengan pesan yang sesuai
        res
          .status(400)
          .json({ message: 'Transaction status is not settlement' });
      }
    } catch (error) {
      next(error);
    }
  }
  async uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No image uploaded' });
      }
      const createdImage = await prisma.upload.create({
        data: {
          title: req.body.title,
          image: req.file.filename,
        },
      });
      res
        .status(200)
        .json({ message: 'Image uploaded successfully', image: createdImage });
    } catch (error) {
      next(error);
    }
  }
}
