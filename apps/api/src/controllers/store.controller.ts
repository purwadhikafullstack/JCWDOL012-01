import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";

export class StoreController {
  async addStoreProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        storeId
      } = req.params;
      const {
        productId,
        quantity,
      } = req.body;

      const existingStore = await prisma.store.findUnique({
        where: { id: Number(storeId) }
      });

      if (!existingStore) {
        return res.status(400).json({
          success: false,
          message: 'Store id not found'
        });
      }

      const exisingProduct = await prisma.product.findUnique({
        where: { id: productId }
      });

      if (exisingProduct) {
        return res.status(400).json({
          success: false,
          message: 'Product already exist on this store'
        });
      }

      const newStoreProduct = await prisma.productInventory.create({
        data: {
          storeId: Number(storeId),
          productId,
          quantity
        }
      });

      return res.status(201).json({
        success: true,
        results: newStoreProduct
      });
    } catch (error) {
      return next(error);
    }
  }

  async getProductsByStore(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId } = req.params;

      const products = await prisma.productInventory.findMany({
        where: {
          storeId: Number(storeId)
        },
        select: {
          id: true,
          product: true,
          quantity: true,
          createdAt: true,
          updatedAt: true,
        }
      });

      if (!products) {
        return res.status(404).json({
          success: false,
          message: 'Products is empty'
        });
      }

      return res.status(200).json({
        success: true,
        results: products
      });
    } catch (error) {
      return next(error);
    }
  }

  async getInventoryDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId, productId } = req.params;

      const productInventory = await prisma.productInventory.findFirst({
        where: {
          storeId: Number(storeId),
          productId: Number(productId)
        },
        include: {
          product: true,
        }
      });

      if (!productInventory) {
        return res.status(404).json({
          success: false,
          message: 'Product not found in this store'
        });
      }

      return res.status(200).json({
        success: true,
        results: productInventory
      });
    } catch (error) {
      return next(error);
    }
  }
}