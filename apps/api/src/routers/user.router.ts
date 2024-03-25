import { UserController } from "@/controllers/user.controller";
import { verifyToken } from "@/middleware/verifyJwt";
import { verifySuperAdmin } from "@/middleware/verifySuperAdmin";
import { Router } from "express";

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    this.router = Router();
    this.userController = new UserController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', verifyToken, verifySuperAdmin, this.userController.getAllUsers);
    this.router.get('/:id', verifyToken, verifySuperAdmin, this.userController.getUserById);
    this.router.put('/:id', verifyToken, verifySuperAdmin, this.userController.updateUser);
    this.router.delete('/:id', verifyToken, verifySuperAdmin, this.userController.deleteUser);
  }

  getRouter() {
    return this.router;
  }
}