import React from 'react';
import { SheetClose } from '@/components/ui/sheet';
import { useRouter } from 'next/navigation';
import { formatToRupiah } from '@/lib/formatToRupiah';

export const CheckoutButton = ({
  totalCartPrice,
}: {
  totalCartPrice: number;
}) => {
  const router = useRouter();
  const handleCheckout = () => {
    router.push('/checkout');
  };
  return (
    <div className="flex justify-between mt-5">
      <div className="flex flex-col font-semibold text-base">
        <p>Total pembayaran</p>
        <p className="font-semibold">{formatToRupiah(totalCartPrice)}</p>
      </div>
      <SheetClose asChild>
        <button
          onClick={handleCheckout}
          className="p-3 bg-black rounded-md text-white "
        >
          Checkout
        </button>
      </SheetClose>
    </div>
  );
};
