import { PromotionController } from "@/controllers/promotion.controller";
import { Router } from "express";

export class PromotionRouter {
  private router: Router;
  private promotionController: PromotionController;

  constructor() {
    this.router = Router();
    this.promotionController = new PromotionController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/bogo', this.promotionController.createBogo);
    this.router.post('/discount', this.promotionController.createDiscount);
  }

  getRouter() {
    return this.router;
  }
}