import { CategoryController } from "@/controllers/category.controller";
import { Router } from "express";

export class CategoryRouter {
  private router: Router;
  private categoryController: CategoryController;

  constructor() {
    this.router = Router();
    this.categoryController = new CategoryController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.categoryController.getAllCategories);
    this.router.post('/', this.categoryController.createCategery);
    this.router.delete('/:id', this.categoryController.deleteCategory);
    this.router.patch('/:id', this.categoryController.updateCategory);
  }

  getRouter() {
    return this.router;
  }
}