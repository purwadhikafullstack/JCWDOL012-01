import { AuthController } from '@/controllers/auth.controller';
import { verifyToken } from '@/middleware/verifyJwt';
import { verifySuperAdmin } from '@/middleware/verifySuperAdmin';
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
    this.router.post('/login', this.authController.loginUser);
    this.router.post('/logout', this.authController.logoutUsers);
    this.router.post('/admin/register', this.authController.registerAdmin);
    this.router.get('/verify-token', verifyToken, this.authController.getUserFromToken);
  }
  getRouter(): Router {
    return this.router;
  }
}
