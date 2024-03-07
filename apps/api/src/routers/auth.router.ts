import { AuthController } from '@/controllers/auth.controller';
import { Router } from 'express';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializaRoutes();
  }
  private initializaRoutes(): void {
    this.router.post('/register', this.authController.registerUser);
  }
  getRouter(): Router{
    return this.router
  }
}
