import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";

export class CategoryController {
  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await prisma.product_Category.findMany({
        include: {
          product: true,
        }
      });

      return res.status(200).json({
        success: true,
        results: categories,
      });
    } catch (error) {
      return next(error);
    }
  }

  async createCategery(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;

      const existingCategory = await prisma.product_Category.findUnique({
        where: {
          name
        }
      });

      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: 'Category name already exist'
        });
      }

      const category = await prisma.product_Category.create({
        data: {
          name
        }
      });

      return res.status(201).json({
        success: true,
        results: category
      });
    } catch (error) {
      return next(error);
    }
  }
}