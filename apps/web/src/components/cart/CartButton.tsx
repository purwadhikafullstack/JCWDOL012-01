'use client';
import { TiShoppingCart } from 'react-icons/ti';
import { CartListProduct } from './CartListProduct';
import { useEffect, useMemo, useState } from 'react';
import { AuthModal } from '../AuthModal';
import { useCookies } from 'next-client-cookies';
import { BsCartX } from 'react-icons/bs';
import { CheckoutButton } from './CheckoutButton';
import { useCart } from '@/provider/CartProvider';
import useGetCart from '@/hooks/useGetCart';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export const CartButton = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { cart } = useCart();
  useGetCart();
  const cookies = useCookies();
  const token = cookies.get('token');

  useEffect(() => {
    if (token) {
      setIsUserLoggedIn(true);
    }
  }, [token]);

  const totalCartPrice = useMemo(() => {
    return cart.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0,
    );
  }, [cart]);

  const handleSheetTrigger = () => {
    if (!isUserLoggedIn) {
      setAuthModalOpen(true);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild onClick={handleSheetTrigger}>
        <div className="flex relative">
          <TiShoppingCart className="h-6 w-6 cursor-pointer" />
          {isUserLoggedIn && (
            <div className="absolute top-0 left-6 w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center text-white text-xs">
              {cart?.reduce((total, item) => total + item.quantity, 0) ?? 0}
            </div>
          )}
        </div>
      </SheetTrigger>
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
            <CheckoutButton totalCartPrice={totalCartPrice} />
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
      {authModalOpen && <AuthModal />}
    </Sheet>
  );
};
