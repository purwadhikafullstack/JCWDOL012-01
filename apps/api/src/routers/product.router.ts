import { ProductController } from "@/controllers/product.controller";
import { uploader } from "@/middlewares/uploader";
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
    this.router.post('/',
      uploader('IMG', '/images').array('files', 3),
      this.productController.createProduct);
    this.router.delete('/:id', this.productController.deleteProductById);
  }

  getRouter() {
    return this.router;
  }
}