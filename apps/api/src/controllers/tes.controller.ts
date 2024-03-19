import { Request, Response } from 'express';
import prisma from '@/prisma';
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'arashi48',
  database: 'grocery',
});

export class TestController {
  async createTest(req: Request, res: Response) {
    try {
      // Membuat entri baru di tabel 'test' menggunakan Prisma
      const test = await prisma.$transaction(async (tx) => {
        const createdTest = await tx.test.create({
          data: {
            title: 'test settimeout',
          },
        });

        return createdTest;
      });

      const newTestId = test.id;

      const createEventQuery = `
        CREATE EVENT change_status_event
        ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 10 SECOND
        DO
        BEGIN
          UPDATE test SET status = 'cancel' WHERE status = 'pending' AND id = ${newTestId};
        END;
      `;

      connection.query(createEventQuery, (err, results, fields) => {
        if (err) {
          console.error('Error creating event scheduler:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Event scheduler created successfully');
      });

      return res.status(201).send(test);
    } catch (error) {
      console.error('Error creating test:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
