import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";

export class ProductController {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          createdAt: true,
          updatedAt: true,
          productCategory: true,
          ProductInventory: true
        },
      });

      return res.status(200).json({
        success: true,
        results: products
      });
    } catch (error) {
      return next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const product = await prisma.product.findUnique({
        where: {
          id: Number(id)
        },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          createdAt: true,
          updatedAt: true,
          productCategory: true,
          ProductInventory: true
        },
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      return res.status(200).json({
        success: true,
        results: product
      });
    } catch (error) {
      return next(error);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, price, category } = req.body;

      const existingProduct = await prisma.product.findUnique({
        where: {
          name
        }
      });

      if (existingProduct) {
        return res.status(400).json({
          success: false,
          message: 'Product name already exist',
        });
      }

      const product = await prisma.product.create({
        data: {
          name,
          description,
          price,
          productCategory: {
            connect: {
              name: category
            }
          }
        }
      });

      return res.status(201).json({
        success: true,
        results: product
      });
    } catch (error) {
      return next(error);
    }
  }
}