import { ProductController } from '@/controllers/product.controller';
import { verifyToken } from '@/middleware/verifyJwt';
import { Router } from 'express';

export class ProductRouter {
  private router: Router;
  private productController: ProductController;

  constructor() {
    this.productController = new ProductController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/:productId', this.productController.getProductById);
    this.router.get('/', this.productController.getProduct);
  }

  getRouter(): Router {
    return this.router;
  }
}
