import { PaymentController } from '@/controllers/payment.controller';
import { proofPayment } from '@/middleware/proofPayment';
import { uploader } from '@/middleware/uploader';
import { proofPaymentValidator } from '@/middleware/validator';
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
      '/:paymentId/payment-proof',
      verifyToken,
      proofPayment('IMG', '/images').single('file'),
      this.paymentController.UploadProofPayment,
    );
    this.router.post('/midtrans-webhook', this.paymentController.webhook);
  }

  getRouter(): Router {
    return this.router;
  }
}
