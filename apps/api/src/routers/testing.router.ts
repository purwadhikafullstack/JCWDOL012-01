import { TesController } from '@/controllers/tes.controller';
import { proofPayment } from '@/middleware/proofPayment';
import { Router } from 'express';

export class TestingRouter {
  private router: Router;
  private testController: TesController;

  constructor() {
    this.testController = new TesController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.testController.createTransaction);
    this.router.post('/midtrans-webhook', this.testController.updateTestStatus);
    this.router.post(
      '/upload',
      proofPayment('IMG', '/images').single('file'),
      this.testController.uploadImage,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
