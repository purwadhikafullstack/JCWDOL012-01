import { Request, Response } from 'express';
import prisma from '@/prisma';

export class CartController {
  async getCountCart(req: Request, res: Response) {
    const dataUser = req.dataUser;
    try {
      const cartItems = await prisma.cart.findMany({
        where: { user_id: dataUser.id },
      });

      let totalQuantity = 0;
      for (const item of cartItems) {
        totalQuantity += item.quantity;
      }

      return res.status(200).json({ quantity: totalQuantity });
    } catch (error) {
      console.error('Error fetching cart:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createCart(req: Request, res: Response) {
    const dataUser = req.dataUser;
    const { quantity, store_id, product_id } = req.body;
    try {
      const stock = await prisma.product_Inventory.findFirst({
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
        return res.status(404).json({ quantity: 0 });
      }

      const cartWithProduct = [];
      for (const item of cart) {
        const product = await prisma.product.findUnique({
          where: { id: item.product_id },
        });
        const image = await prisma.image.findFirst({
          where: { product_id: item.product_id },
        });

        cartWithProduct.push({
          ...item,
          image: `http://${req.get('host')}/image/${image?.url}`,
          price: product?.price,
          name: product?.name,
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

      return res.status(204).send(deleteCart);
    } catch (error) {
      console.error('Error delete cart:', error);
      return res.status(500).json({ error: 'Internal Server error' });
    }
  }
}
