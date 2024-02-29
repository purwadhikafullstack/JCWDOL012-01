import { StoreController } from "@/controllers/store.controller";
import { Router } from "express";

export class StoreRouter {
  private router: Router;
  private storeController: StoreController;

  constructor() {
    this.router = Router();
    this.storeController = new StoreController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/:storeId/products', this.storeController.addStoreProduct);
    this.router.get('/:storeId/products', this.storeController.getProductsByStore);
    this.router.get('/:storeId/products/:productId', this.storeController.getInventoryDetails);
  }

  getRouter() {
    return this.router;
  }
}