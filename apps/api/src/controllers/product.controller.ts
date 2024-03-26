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
          weight: true,
          createdAt: true,
          updatedAt: true,
          category: true,
          product_inventories: true
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
          weight: true,
          createdAt: true,
          updatedAt: true,
          category: true,
          product_inventories: true,
          images: true,
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
      const { name, description, price, weight, category } = req.body;
      const files: any = req.files;

      if (!files?.length) {
        return res.status(400).json({
          success: false,
          message: 'no image uploaded'
        });
      }

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
          weight,
          category: {
            connect: {
              name: category
            }
          }
        }
      });

      const images = files.map((file: Express.Multer.File) => {
        return { product_id: product.id, url: process.env.BASE_URL + 'images/' + file?.filename };
      });

      const productImages = await prisma.image.createMany({
        data: images
      });

      return res.status(201).json({
        success: true,
        results: {
          product,
          images: productImages
        }
      });
    } catch (error) {
      return next(error);
    }
  }

  async deleteProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const existingProduct = await prisma.product.findUnique({
        where: { id: Number(id) }
      });

      if (!existingProduct) {
        return res.status(400).json({
          success: false,
          message: 'Product not found'
        });
      }

      const existingInventory = await prisma.product_Inventory.findFirst({
        where: {
          product_id: Number(id)
        }
      });

      if (existingInventory) {
        return res.status(400).json({
          success: false,
          message: 'Some store assign this product'
        });
      }

      await prisma.product.delete({
        where: { id: Number(id) }
      });

      return res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
      });
    } catch (error) {
      return next(error);
    }
  }

  async updateProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, price, weight, category, description } = req.body;

      const existingName = await prisma.product.findUnique({
        where: { name, NOT: { id: Number(id) } }
      });

      if (existingName) {
        return res.status(400).json({ success: false, message: 'Product name already exist' });
      }

      const product = await prisma.product.update({
        where: { id: Number(id) },
        data: {
          name, price, weight, category: { connect: { name: category } }, description
        }
      });

      return res.status(200).json({ success: true, results: product });
    } catch (error) {
      return next(error);
    }
  }

  async updateProductImageById(req: Request, res: Response, next: NextFunction) {
    try {
      const { imageId } = req.params;

      const file: any = req.file;

      if (!file) {
        return res.status(400).json({ success: false, message: 'No image uploaded' });
      }

      const image = await prisma.image.update({
        where: { id: Number(imageId) },
        data: {
          url: process.env.BASE_URL + 'images/' + file?.filename
        }
      });

      return res.status(200).json({ success: true, results: image });
    } catch (error) {
      return next(error);
    }
  }
}