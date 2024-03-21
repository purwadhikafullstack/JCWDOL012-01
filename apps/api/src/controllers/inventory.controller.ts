import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";

export class InventoryController {
  async addStoreProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        storeId
      } = req.params;
      const {
        productId,
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

      if (!exisingProduct) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      const existingInventory = await prisma.product_Inventory.findFirst({
        where: {
          store_id: Number(storeId),
          product_id: productId
        }
      });

      if (existingInventory) {
        return res.status(400).json({
          success: false,
          message: 'Product already exist in this store'
        });
      }

      const newStoreProduct = await prisma.product_Inventory.create({
        data: {
          store_id: Number(storeId),
          product_id: productId,
          quantity: 0
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
      let searchQuery: any = {};

      if (req.query.search || req.query.cat) {
        searchQuery = { OR: [] };
      }

      if (req.query.search) {
        searchQuery.OR.push({
          product: {
            name: { contains: String(req.query.search) }
          }
        });
      }

      if (req.query.cat) {
        searchQuery.OR.push({
          product: {
            category: {
              name: { contains: String(req.query.cat) }
            }
          }
        });
      }

      let { page, perPage } = req.query;
      let skip = 0;
      let take = 5;
      if (perPage && !isNaN(Number(perPage))) {
        take = Number(perPage);
      }
      if (page && !isNaN(Number(page))) {
        skip = take * (Number(page) - 1);
      }

      const products = await prisma.product_Inventory.findMany({
        where: {
          store_id: Number(storeId),
          ...searchQuery
        },
        skip,
        take,
        select: {
          id: true,
          product: true,
          quantity: true,
          createdAt: true,
          updatedAt: true,
          store: true
        },
        orderBy: { createdAt: 'desc' }
      });

      const totalProduct = await prisma.product_Inventory.count({
        where: {
          store_id: Number(storeId),
          ...searchQuery
        },
      });

      if (!products) {
        return res.status(404).json({
          success: false,
          message: 'Products is empty'
        });
      }

      return res.status(200).json({
        success: true,
        results: {
          totalProduct,
          products
        }
      });
    } catch (error) {
      return next(error);
    }
  }

  async getInventoryDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId, productId } = req.params;

      const productInventory = await prisma.product_Inventory.findFirst({
        where: {
          store_id: Number(storeId),
          product_id: Number(productId)
        },
        include: {
          product: {
            include: {
              images: true,
              category: true,
            }
          },
          vouchers: true,
          store: true,
          stocklogs: { orderBy: { createdAt: "desc" } },
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

  async addStockInventory(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId, productId } = req.params;
      const { qty } = req.body;

      const existingInventory = await prisma.product_Inventory.findFirst({
        where: {
          product_id: Number(productId),
          store_id: Number(storeId),
        }
      });

      if (!existingInventory) {
        return res.status(400).json({ success: false, message: 'Inventory not found' });
      }

      const updatedInventory = await prisma.product_Inventory.update({
        where: {
          id: existingInventory.id
        },
        data: {
          quantity: { increment: qty },
          stocklogs: { create: { typeLog: "Addition", quantity: qty } }
        }
      });

      return res.status(200).json({ success: true, results: updatedInventory });
    } catch (error) {
      return next(error);
    }
  }

  async reduceStockInventory(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId, productId } = req.params;
      const { qty } = req.body;

      const existingInventory = await prisma.product_Inventory.findFirst({
        where: {
          product_id: Number(productId),
          store_id: Number(storeId),
        }
      });

      if (!existingInventory) {
        return res.status(400).json({ success: false, message: 'Inventory not found' });
      }

      if (qty > existingInventory.quantity) {
        return res.status(400).json({ success: false, message: 'Qty must be less than or equals to stock' });
      }

      const updatedInventory = await prisma.product_Inventory.update({
        where: {
          id: existingInventory.id
        },
        data: {
          quantity: { decrement: qty },
          stocklogs: { create: { typeLog: "Reduction", quantity: qty } }
        }
      });

      return res.status(200).json({ success: true, results: updatedInventory });
    } catch (error) {
      return next(error);
    }
  }
}