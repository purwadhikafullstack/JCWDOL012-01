import { CartButton } from './cart/CartButton';
import Link from 'next/link';
import DialogLogin from './DialogLogin';
import DialogForm from './DialogRegister';

export const Navbar = () => {
  return (
    <nav className=" bg-gray-800 ">
      <div className="wrapper flex justify-between items-center px-4 py-2 text-white">
        <Link href={'/'}>
          <h1 className="text-xl font-bold">My Shop</h1>
        </Link>
        <div className="flex justify-between gap-5">
          <CartButton />
          <Link href={'/login'}>
            <h1>Login</h1>
          </Link>
        </div>
        <DialogForm />
        <DialogLogin />
      </div>
    </nav>
  );
};
