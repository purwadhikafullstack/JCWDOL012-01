import { AddressController } from '@/controllers/address.controller';
import { PaymentController } from '@/controllers/payment.controller';
import { verifyToken } from '@/middleware/verifyJwt';
import { Router } from 'express';

export class PaymentRouter {
  private router: Router;
  private paymentController: PaymentController;

  constructor() {
    this.paymentController = new PaymentController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', verifyToken, this.paymentController.getPayment);
    this.router.patch(
      '/:paymentId',
      verifyToken,
      this.paymentController.updateStatusPayment,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
