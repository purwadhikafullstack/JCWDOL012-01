import { AddressController } from '@/controllers/address.controller';
import { OrderController } from '@/controllers/order.controller';

import { verifyToken } from '@/middleware/verifyJWT';
import { Router } from 'express';

export class OrderRouter {
  private router: Router;
  private orderController: OrderController;

  constructor() {
    this.orderController = new OrderController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', verifyToken, this.orderController.getOrder);
    this.router.patch(
      '/:orderId/cancel',
      verifyToken,
      this.orderController.cancelOrder,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
