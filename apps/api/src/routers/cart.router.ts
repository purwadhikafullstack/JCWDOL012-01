import { CartController } from '@/controllers/cart.controller';
import { verifyToken } from '@/middleware/verifyJwt';
import { Router } from 'express';

export class CartRouter {
  private router: Router;
  private cartController: CartController;

  constructor() {
    this.cartController = new CartController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/count', verifyToken, this.cartController.getCountCart);
    this.router.get('/', verifyToken, this.cartController.getCart);
    this.router.patch(
      '/:cartId/quantity',
      verifyToken,
      this.cartController.updateCart,
    );
    this.router.post('/create', verifyToken, this.cartController.createCart);
    this.router.delete(
      '/:cartId/delete',
      verifyToken,
      this.cartController.deleteCart,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
