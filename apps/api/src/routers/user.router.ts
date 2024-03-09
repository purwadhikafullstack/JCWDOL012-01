import { CartController } from '@/controllers/cart.controller';
import { UserController } from '@/controllers/user.controller';
import { verifyToken } from '@/middleware/verifyJwt';
import { Router } from 'express';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', verifyToken, this.userController.getUserbyId);
  }

  getRouter(): Router {
    return this.router;
  }
}
