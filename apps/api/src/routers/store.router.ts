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
    this.router.get('/find-nearest', this.storeController.getNearestStore);
    this.router.get('/', this.storeController.getAllStores);
  }

  getRouter() {
    return this.router;
  }
}