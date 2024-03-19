import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { AuthRouter } from './routers/auth.router';
import { CartRouter } from './routers/cart.router';
import { ProductRouter } from './routers/product.router';
import { AddressRouter } from './routers/address.router';
import { ShipmentRouter } from './routers/shipment.router';
import { VoucherRouter } from './routers/voucher.router';
import { UserRouter } from './routers/user.router';
import { TestingRouter } from './routers/testing.router';
import { TransactionRouter } from './routers/transaction.router';
import { PaymentRouter } from './routers/payment.router';

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
    const authRouter = new AuthRouter();
    const cartRouter = new CartRouter();
    const productRouter = new ProductRouter();
    const addressRouter = new AddressRouter();
    const shipmentRouter = new ShipmentRouter();
    const voucherRouter = new VoucherRouter();
    const userRouter = new UserRouter();
    const testingRouter = new TestingRouter();
    const transactionRouter = new TransactionRouter();
    const paymentRouter = new PaymentRouter();

    this.app.get('/', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student !`);
    });

    this.app.use(express.static('public'));
    this.app.use('/api/products', productRouter.getRouter());
    this.app.use('/api/auth', authRouter.getRouter());
    this.app.use('/api/cart', cartRouter.getRouter());
    this.app.use('/api/address', addressRouter.getRouter());
    this.app.use('/api/shipment', shipmentRouter.getRouter());
    this.app.use('/api/voucher', voucherRouter.getRouter());
    this.app.use('/api/user', userRouter.getRouter());
    this.app.use('/api/testing', testingRouter.getRouter());
    this.app.use('/api/transaction', transactionRouter.getRouter());
    this.app.use('/api/payment', paymentRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
