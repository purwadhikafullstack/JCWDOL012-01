import { InventoryController } from "@/controllers/inventory.controller";
import { Router } from "express";

export class InventoryRouter {
  private router: Router;
  private inventoryController: InventoryController;

  constructor() {
    this.router = Router();
    this.inventoryController = new InventoryController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/:storeId/products', this.inventoryController.addStoreProduct);
    this.router.get('/:storeId/products', this.inventoryController.getProductsByStore);
    this.router.get('/:storeId/products/:productId', this.inventoryController.getInventoryDetails);
    this.router.patch('/:storeId/products/:productId/add-stock', this.inventoryController.addStockInventory)
    this.router.patch('/:storeId/products/:productId/reduce-stock', this.inventoryController.reduceStockInventory)
  }

  getRouter() {
    return this.router;
  }
}