import { VoucherController } from '@/controllers/voucher.controller';
import { verifyToken } from '@/middleware/verifyJwt';
import { Router } from 'express';

export class VoucherRouter {
  private router: Router;
  private voucherController: VoucherController;

  constructor() {
    this.voucherController = new VoucherController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', verifyToken, this.voucherController.getVoucher);
  }

  getRouter(): Router {
    return this.router;
  }
}
