import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";

export class VoucherController {

  // async createProductDiscount(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { storeId, inventoryId, type, amount, limit_usage, expired } = req.body;

  //     const existingInventory = await prisma.product_Inventory.findUnique({ where: { id: Number(inventoryId), store_id: Number(storeId) } });
  //     if (!existingInventory) return res.status(400).json({ success: false, message: 'Inventory not found' });

  //     const existingVoucher = await prisma.voucher.findFirst({ where: { inventory_id: Number(inventoryId), voucher_type: 'Product' } });

  //     let voucher;

  //     if (existingVoucher) {
  //       voucher = await prisma.voucher.update({
  //         where: { id: existingVoucher.id },
  //         data: {
  //           expired_at: expired,
  //           type,
  //           amount,
  //           limit_usage
  //         }
  //       });
  //     } else {
  //       voucher = await prisma.voucher.create({
  //         data: {
  //           inventory_id: Number(inventoryId),
  //           store_id: Number(storeId),
  //           expired_at: expired,
  //           voucher_type: 'Product',
  //           type,
  //           amount,
  //           limit_usage
  //         }
  //       });
  //     }

  //     return res.status(201).json({ success: true, results: voucher });
  //   } catch (error) {
  //     return next(error);
  //   }
  // }
}