import { Request, Response } from 'express';
import prisma from '@/prisma';

export class CartController {
  async getCountCart(req: Request, res: Response) {
    const dataUser = req.dataUser;
    try {
      let count = await prisma.cart.findMany({
        where: { user_id: dataUser.id },
      });

      if (count.length === 0) {
        return res.status(200).json({ cart: 0 });
      }

      return res.status(200).send(count);
    } catch (error) {
      console.error('Error fetching cart:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createCart(req: Request, res: Response) {
    const dataUser = req.dataUser;
    const { quantity, store_id, product_id } = req.body;
    try {
      const stock = await prisma.product_inventory.findFirst({
        where: {
          product_id: Number(product_id),
          store_id: Number(store_id),
        },
      });
      if (stock?.quantity === 0) {
        return res.status(400).json({ error: 'Stok kosong' });
      }

      const cart = await prisma.cart.findFirst({
        where: { product_id: Number(product_id), user_id: dataUser.id },
      });

      if (cart) {
        if (!stock || stock.quantity < cart.quantity + 1) {
          return res.status(400).json({ error: 'Stok tidak mencukupi' });
        }
        const updateCart = await prisma.cart.update({
          where: { id: cart.id },
          data: { quantity: cart.quantity + 1 },
        });
        return res.status(200).send(updateCart);
      }

      const newCart = await prisma.cart.create({
        data: {
          user_id: dataUser.id,
          product_id: Number(product_id),
          quantity,
        },
      });
      return res.status(201).send(newCart);
    } catch (error) {
      console.error('Error create cart', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getCart(req: Request, res: Response) {
    const dataUser = req.dataUser;
    try {
      const cart = await prisma.cart.findMany({
        where: { user_id: dataUser.id },
      });

      if (cart.length === 0) {
        return res.status(400).json({ error: 'cart not found' });
      }

      const cartWithProduct = [];
      for (const item of cart) {
        const product = await prisma.product.findUnique({
          where: { id: item.product_id },
        });
        const firstImage = Array.isArray(product?.image)
          ? product?.image[0]
          : null;
        cartWithProduct.push({
          ...item,
          image: `${req.get('host')}/image/${firstImage}`,
          price: product?.price,
        });
      }

      return res.status(200).send(cartWithProduct);
    } catch (error) {
      console.error('Error get cart', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateCart(req: Request, res: Response) {
    const { cartId } = req.params;
    const { quantityChange } = req.body;
    try {
      const updatedCart = await prisma.cart.update({
        where: { id: Number(cartId) },
        data: {
          quantity: {
            increment: quantityChange,
          },
        },
      });

      return res.status(200).json(updatedCart);
    } catch (error) {
      console.error('Error updating cart:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteCart(req: Request, res: Response) {
    const { cartId } = req.params;

    try {
      const deleteCart = await prisma.cart.delete({
        where: { id: Number(cartId) },
      });

      return res.status(204).send();
    } catch (error) {
      console.error('Error delete cart:', error);
      return res.status(500).json({ error: 'Internal Server error' });
    }
  }
}
