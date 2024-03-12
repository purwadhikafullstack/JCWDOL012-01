import { Request, Response } from 'express';
import prisma from '@/prisma';

export class TestController {
  async createTest(req: Request, res: Response) {
    try {
      const test = await prisma.$transaction(async (tx) => {
        const createdTest = await tx.test.create({
          data: {
            title: 'test settimeout',
          },
        });

        return createdTest;
      });

      setTimeout(async () => {
        try {
          const pendingTest = await prisma.test.findFirst({
            where: {
              id: test.id,
              status: 'pending',
            },
          });

          if (pendingTest) {
            await prisma.test.update({
              where: {
                id: test.id,
              },
              data: {
                status: 'cancel',
              },
            });
          }
        } catch (error) {
          console.error('Error checking and updating test status:', error);
        }
      }, 20000);

      return res.status(201).send(test);
    } catch (error) {
      console.error('Error create test', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
