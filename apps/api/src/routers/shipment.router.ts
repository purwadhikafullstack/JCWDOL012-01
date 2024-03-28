import { ShipmentController } from '@/controllers/shipment.controller';
import { verifyToken } from '@/middleware/verifyJwt';
import { Router } from 'express';

export class ShipmentRouter {
  private router: Router;
  private shipmentController: ShipmentController;

  constructor() {
    this.shipmentController = new ShipmentController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', verifyToken, this.shipmentController.getShippingCost);
    this.router.get('/city', verifyToken, this.shipmentController.getcityId);
  }

  getRouter(): Router {
    return this.router;
  }
}
