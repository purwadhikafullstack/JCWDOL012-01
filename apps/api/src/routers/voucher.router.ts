import { VoucherController } from "@/controllers/voucher.controller";
import { Router } from "express";

export class VoucherRouter {
  private router: Router;
  private voucherController: VoucherController;

  constructor() {
    this.router = Router();
    this.voucherController = new VoucherController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.voucherController.getAllVouchers);
    this.router.post('/bogo', this.voucherController.createBogo);
    this.router.post('/product', this.voucherController.createProductDiscount);
  }

  getRouter() {
    return this.router;
  }
}