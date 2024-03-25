import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { ProductRouter } from './routers/product.router';
import { InventoryRouter } from './routers/inventory.router';
import { CategoryRouter } from './routers/category.router';
import { StoreRouter } from './routers/store.router';
import { AuthRouter } from './routers/auth.router';
import { CartRouter } from './routers/cart.router';
import { VoucherRouter } from './routers/voucher.router';
import { PromotionRouter } from './routers/promotion.router';
import { UserRouter } from './routers/user.router';


export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(express.static('public'));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const inventoryRouter = new InventoryRouter();
    const storeRouter = new StoreRouter();
    const productRouter = new ProductRouter();
    const categoryRouter = new CategoryRouter();
    const cartRouter = new CartRouter();
    const voucherRouter = new VoucherRouter();
    const promotionRouter = new PromotionRouter();
    const userRouter = new UserRouter();
    const authRouter = new AuthRouter();

    this.app.get('/', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student !`);
    });

    this.app.use(express.static('public'));

    this.app.use('/api/store', inventoryRouter.getRouter());
    this.app.use('/api/store', storeRouter.getRouter());
    this.app.use('/api/products', productRouter.getRouter());
    this.app.use('/api/categories', categoryRouter.getRouter());
    this.app.use('/api/auth', authRouter.getRouter());
    this.app.use('/api/cart', cartRouter.getRouter());
    this.app.use('/api/vouchers', voucherRouter.getRouter());
    this.app.use('/api/promotions', promotionRouter.getRouter());
    this.app.use('/api/users', userRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
