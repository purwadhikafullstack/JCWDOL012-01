import { Request, Response } from 'express';
import { join } from 'path';

export class ImageController {
  async getImage(req: Request, res: Response) {
    const { filename } = req.params;
    const filePath = join(__dirname, '../../public/images', filename);

    try {
      res.sendFile(filePath);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
