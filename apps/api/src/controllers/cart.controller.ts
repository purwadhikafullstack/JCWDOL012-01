import { NextFunction, Request, Response } from 'express';
import prisma from '@/prisma';
import { getDistance } from 'geolib';

export class CartController {
  async getCart(req: Request, res: Response, next: NextFunction) {
    const dataUser = req.dataUser;
    try {
      const cart = await prisma.cart.findMany({
        where: { user_id: dataUser.id },
      });

      if (cart.length === 0) {
        return res.status(200).json({
          success: true,
          message: 'tidak ada produk dalam keranjang',
          result: [],
        });
      }

      const cartWithProduct = [];
      for (const item of cart) {
        const product = await prisma.product.findUnique({
          where: { id: item.product_id },
          include: {
            images: true,
          },
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
      return next(error);
    }
  }

  async createCart(req: Request, res: Response, next: NextFunction) {
    const dataUser = req.dataUser;
    const { quantity, store_id, product_id } = req.body;
    let newCart;

    try {
      const stock = await prisma.product_Inventory.findFirst({
        where: {
          product_id: Number(product_id),
          store_id: Number(store_id),
        },
        include: { product: { select: { name: true } } },
      });

      if (!stock || stock.quantity === 0) {
        return res
          .status(400)
          .json({ success: false, message: 'Stok kosong', result: stock });
      }

      const cart = await prisma.cart.findFirst({
        where: { product_id: Number(product_id), user_id: dataUser.id },
      });

      if (cart) {
        const newQuantity = cart.quantity + quantity;
        if (newQuantity > stock.quantity) {
          const updateCart = await prisma.cart.update({
            where: { id: cart.id },
            data: { quantity: stock.quantity },
            include: {
              product: { select: { name: true } },
            },
          });
          return res.status(400).json({
            success: true,
            message: 'Stok terbatas',
            result: updateCart,
          });
        }

        const updateCart = await prisma.cart.update({
          where: { id: cart.id },
          data: { quantity: newQuantity },
        });
        return res.status(201).json({
          success: true,
          message: 'Barang berhasil ditambahkan',
          result: updateCart,
        });
      } else if (quantity > stock.quantity) {
        newCart = await prisma.cart.create({
          data: {
            user_id: dataUser.id,
            product_id: Number(product_id),
            quantity: stock.quantity,
          },
          include: {
            product: { select: { name: true } },
          },
        });
        return res.status(400).json({
          success: true,
          message: 'Stok terbatas',
          result: newCart,
        });
      } else
        newCart = await prisma.cart.create({
          data: {
            user_id: dataUser.id,
            product_id: Number(product_id),
            quantity,
          },
        });
      return res.status(201).json({
        success: true,
        message: 'Barang berhasil ditambahkan',
        result: newCart,
      });
    } catch (error) {
      return next(error);
    }
  }

  async updateCart(req: Request, res: Response, next: NextFunction) {
    const dataUser = req.dataUser;
    const { cartId } = req.params;
    const { quantityChange, latitude, longitude } = req.body;
    try {
      let nearestStoreId = null;
      const address = await prisma.user_Address.findFirst({
        where: { user_id: dataUser.id, isPrimary: true },
      });

      if (address) {
        const stores = await prisma.store.findMany();
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
        nearestStoreId = nearestStores.length > 0 ? nearestStores[0].id : null;
      } else if (latitude !== undefined && longitude !== undefined) {
        const stores = await prisma.store.findMany();
        const nearestStores = stores.filter((store) => {
          const distance = getDistance(
            {
              latitude: parseFloat(store.latitude.toString()),
              longitude: parseFloat(store.longitude.toString()),
            },
            {
              latitude: parseFloat(latitude.toString()),
              longitude: parseFloat(longitude.toString()),
            },
          );
          return distance <= 15000;
        });
        nearestStoreId = nearestStores.length > 0 ? nearestStores[0].id : null;
      } else {
        return res.status(400).json({
          message:
            'Alamat tidak ditemukan dan tidak ada koordinat yang diberikan',
        });
      }
      if (!nearestStoreId) {
        return res
          .status(400)
          .json({ message: 'Tidak dapat menemukan toko terdekat' });
      }
      const cart = await prisma.cart.findFirst({
        where: { id: Number(cartId) },
      });
      const stock = await prisma.product_Inventory.findFirst({
        where: {
          product_id: Number(cart?.product_id),
          store_id: Number(nearestStoreId),
        },
      });
      if (!stock || stock.quantity < cart?.quantity + quantityChange) {
        const updatedCart = await prisma.cart.update({
          where: { id: Number(cartId) },
          data: {
            quantity: stock?.quantity,
          },
          include: {
            product: {
              select: { name: true },
            },
          },
        });
        return res.status(400).json({
          success: false,
          message: 'Stok terbatas',
          result: updatedCart,
        });
      }
      const updatedCart = await prisma.cart.update({
        where: { id: Number(cartId) },
        data: {
          quantity: {
            increment: quantityChange,
          },
        },
      });
      return res.status(200).json({
        success: true,
        message: 'Stok berhasil ditambahkan',
        result: updatedCart,
      });
    } catch (error) {
      return next(error);
    }
  }

  async deleteCart(req: Request, res: Response, next: NextFunction) {
    const { cartId } = req.params;

    try {
      const deleteCart = await prisma.cart.delete({
        where: { id: Number(cartId) },
      });

      return res.status(204).send(deleteCart);
    } catch (error) {
      return next(error);
    }
  }

  async deleteAllCart(req: Request, res: Response, next: NextFunction) {
    const dataUser = req.dataUser;
    try {
      const deleteCart = await prisma.cart.deleteMany({
        where: { user_id: Number(dataUser.id) },
      });

      return res.status(204).send(deleteCart);
    } catch (error) {
      return next(error);
    }
  }
}
