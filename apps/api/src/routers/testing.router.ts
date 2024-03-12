import { CartController } from '@/controllers/cart.controller';
import { TestController } from '@/controllers/tes.controller';
import { verifyToken } from '@/middleware/verifyJwt';
import { Router } from 'express';

export class TestingRouter {
  private router: Router;
  private testController: TestController;

  constructor() {
    this.testController = new TestController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/', this.testController.createTest);
  }

  getRouter(): Router {
    return this.router;
  }
}
