'use client';
import { TiShoppingCart } from 'react-icons/ti';
import { CartListProduct } from './CartListProduct';
import { BsCartX } from 'react-icons/bs';
import { CheckoutButton } from './CheckoutButton';
import { useCart } from '@/provider/CartProvider';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useSession } from '@/provider/SessionProvider';
import { useDialog } from '@/hooks/useDialog';
import DialogForm from '../DialogRegister';
import DialogLogin from '../DialogLogin';
import { useState } from 'react';

export const CartButton = () => {
  const { isUserLoggedIn } = useSession();
  const { onOpenLogin } = useDialog();
  const { cart, totalCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleSheetTrigger = () => {
    if (!isUserLoggedIn) {
      onOpenLogin();
      return setIsOpen(false);
    }
    return setIsOpen(true);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex relative">
        <TiShoppingCart
          onClick={handleSheetTrigger}
          className="h-6 w-6 cursor-pointer"
        />
        {isUserLoggedIn &&
          (cart.length > 0 ? (
            <div className="absolute top-0 left-6 w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center text-white text-xs">
              {cart.reduce((total, item) => total + item.quantity, 0)}
            </div>
          ) : (
            <div className="absolute top-0 left-6 w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center text-white text-xs">
              0
            </div>
          ))}
      </div>
      {isUserLoggedIn && (
        <SheetContent style={{ overflowY: 'auto' }}>
          <SheetHeader>
            <SheetTitle>Keranjang</SheetTitle>
            <hr className="border-1 border-black w-full mt-2" />
          </SheetHeader>
          <div className="flex flex-col mt-5 mb-5">
            {cart && cart.length > 0 && (
              <div className="flex flex-col gap-7">
                {cart.map((item) => (
                  <CartListProduct key={item.id} cartItem={item} />
                ))}
              </div>
            )}
          </div>
          {cart && cart.length > 0 ? (
            <CheckoutButton totalCartPrice={totalCart} />
          ) : (
            <div className="flex flex-col justify-center items-center gap-5">
              <BsCartX className="h-56 w-56" />
              <p className="text-xl font-bold">Keranjang kamu masih kosong</p>
              <p className="text-base">
                Yuk, segera cari produk yang kamu butuhkan!
              </p>
            </div>
          )}
        </SheetContent>
      )}
    </Sheet>
  );
};
