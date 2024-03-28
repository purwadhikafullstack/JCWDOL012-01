import { AddressController } from '@/controllers/address.controller';
import { OrderController } from '@/controllers/order.controller';

import { verifyToken } from '@/middleware/verifyJwt';
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
    this.router.get(
      '/:orderId',
      verifyToken,
      this.orderController.getOrderById,
    );
    this.router.patch(
      '/:orderId/cancel',
      verifyToken,
      this.orderController.cancelOrder,
    );
    this.router.patch(
      '/:orderId/confirmed',
      verifyToken,
      this.orderController.orderRecieve,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
