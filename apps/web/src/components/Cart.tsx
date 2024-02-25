'use client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { TiShoppingCart } from 'react-icons/ti';
import { CartProduct } from './CartProduct';
import { CartCheckout } from './CartCheckout';
import { useState } from 'react';
import { AuthModal } from './AuthModal';

export const Cart = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleSheetTrigger = () => {
    if (!isUserLoggedIn) {
      console.log(
        'Pengguna belum login. Tampilkan modal login atau arahkan ke halaman login.',
      );
      setAuthModalOpen(true);
    } else {
      console.log('Pengguna sudah login. Buka sheet.');
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild onClick={handleSheetTrigger}>
        <div className="flex relative">
          <TiShoppingCart className="h-6 w-6 cursor-pointer" />
          <div className="absolute top-0 left-6 w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center text-white text-xs">
            0
          </div>
        </div>
      </SheetTrigger>
      {isUserLoggedIn && (
        <SheetContent style={{ overflowY: 'auto' }}>
          <SheetHeader>
            <SheetTitle>MY CART</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col mt-2">
            <div className="flex flex-col gap-2">
              <CartProduct />
            </div>
          </div>
          <CartCheckout />
        </SheetContent>
      )}
      {authModalOpen && <AuthModal />}
    </Sheet>
  );
};
