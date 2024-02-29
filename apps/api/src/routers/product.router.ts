import { ProductController } from "@/controllers/product.controller";
import { Router } from "express";

export class ProductRouter {
  private router: Router;
  private productController: ProductController;

  constructor() {
    this.router = Router();
    this.productController = new ProductController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.productController.getProducts);
    this.router.get('/:id', this.productController.getProductById);
    this.router.post('/', this.productController.createProduct);
  }

  getRouter() {
    return this.router;
  }
}