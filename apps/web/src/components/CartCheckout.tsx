import React from 'react';
import { SheetClose } from '@/components/ui/sheet';
import { useRouter } from 'next/navigation';

export const CartCheckout = () => {
  const router = useRouter();
  const handleCheckout = () => {
    router.push('/checkout');
  };
  return (
    <div className="flex justify-between mt-5">
      <div className="flex flex-col font-semibold text-base">
        <p>Total pembayaran</p>
        <p className="text-orange-400">Rp 30.000</p>
      </div>
      <SheetClose asChild>
        <button
          onClick={handleCheckout}
          className="p-3 bg-blue-500 rounded-md text-white "
        >
          Checkout
        </button>
      </SheetClose>
    </div>
  );
};
