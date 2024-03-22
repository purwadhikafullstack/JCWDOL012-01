import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";

export class PromotionController {
  async createBogo(req: Request, res: Response, next: NextFunction) {
    try {
      const { inventoryId, limit_usage } = req.body;

      const existingPromotion = await prisma.promotion.findFirst({ where: { inventory_id: inventoryId, promotion_type: 'Bogo' } });

      let promotion;

      if (existingPromotion) {
        promotion = await prisma.promotion.update({
          where: { id: existingPromotion.id },
          data: { limit_usage }
        });
      } else {
        promotion = await prisma.promotion.create({
          data: {
            inventory_id: inventoryId,
            promotion_type: 'Bogo',
            limit_usage,
          }
        });
      }

      return res.status(200).json({ success: true, results: promotion });
    } catch (error) {
      return next(error);
    }
  }

  async createDiscount(req: Request, res: Response, next: NextFunction) {
    try {
      const { inventoryId, discount_type, amount, limit_usage } = req.body;

      const existingPromotion = await prisma.promotion.findFirst({ where: { inventory_id: inventoryId, promotion_type: 'Discount' } });

      let promotion;

      if (existingPromotion) {
        promotion = await prisma.promotion.update({
          where: { id: existingPromotion?.id },
          data: {
            discount_type,
            amount,
            limit_usage
          }
        });
      } else {
        promotion = await prisma.promotion.create({
          data: {
            inventory_id: inventoryId,
            promotion_type: 'Discount',
            discount_type,
            amount,
            limit_usage
          }
        });
      }

      return res.status(200).json({ success: true, results: promotion });
    } catch (error) {
      return next(error);
    }
  }
}