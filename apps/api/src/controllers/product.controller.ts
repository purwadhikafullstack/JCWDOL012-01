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
          categoryId: true,
          Product_inventory: true
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
          categoryId: true,
          Product_inventory: true
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
          image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fexcelso-coffee.com%2Fproduct%2Fexcelso-the-classic-bubuk-200g%2F&psig=AOvVaw2J3vzp6Lzv3nzJL2yS7gmy&ust=1709693010012000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMDGqPaM3IQDFQAAAAAdAAAAABAR',
          categoryId: {
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