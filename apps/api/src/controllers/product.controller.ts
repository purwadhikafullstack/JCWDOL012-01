import { Request, Response } from 'express';
import prisma from '@/prisma';

export class ProductController {
  async getProduct(req: Request, res: Response) {
    try {
      const product = await prisma.product.findMany();

      if (product.length === 0) {
        return res.status(400).json({ error: 'Product not found' });
      }
      return res.status(200).send(product);
    } catch (error) {
      console.error('Error get cart', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getProductById(req: Request, res: Response) {
    const { productId } = req.params;
    const { store_id } = req.body;
    try {
      const product = await prisma.product.findUnique({
        where: { id: Number(productId) },
      });

      const inventory = await prisma.product_inventory.findFirst({
        where: { product_id: Number(productId), store_id: Number(store_id) },
      });

      if (!product) {
        return res.status(400).json({ error: 'Product not found' });
      }

      const productWithInventory = {
        ...product,
        quantity: inventory?.quantity,
      };

      return res.status(200).send(productWithInventory);
    } catch (error) {
      console.error('Error get product', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
