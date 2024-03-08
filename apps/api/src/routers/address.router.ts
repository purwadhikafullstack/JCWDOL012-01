import { AddressController } from '@/controllers/address.controller';
import { verifyToken } from '@/middleware/verifyJwt';
import { Router } from 'express';

export class AddressRouter {
  private router: Router;
  private addressController: AddressController;

  constructor() {
    this.addressController = new AddressController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', verifyToken, this.addressController.getAdress);
  }

  getRouter(): Router {
    return this.router;
  }
}
