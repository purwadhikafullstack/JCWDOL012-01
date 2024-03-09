import React, { useMemo } from 'react';
import { IoInformationCircle } from 'react-icons/io5';
import { CheckoutListProduct } from './CheckoutListProduct';
import { CheckoutTotal } from './CheckoutTotal';
import { CheckoutVoucher } from './CheckoutVoucher';
import { useCart } from '@/provider/CartProvider';
import { formatToRupiah } from '@/lib/formatToRupiah';
import { CheckoutAddress } from './CheckoutAddress';

interface CheckoutProductSelectionProps {
  onNextStep: () => void;
}

export const CheckoutProductSelection: React.FC<
  CheckoutProductSelectionProps
> = ({ onNextStep }) => {
  const { cart } = useCart();

  const totalCartPrice = useMemo(() => {
    return cart.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0,
    );
  }, [cart]);

  return (
    <div>
      <div className="bg-gray-100">
        <div className="wrapper flex w-full gap-20 justify-center">
          <div className="flex flex-col w-full lg:w-3/4 space-y-5">
            <div className="bg-blue-100 p-1 text-black flex gap-1 items-center rounded-md">
              <IoInformationCircle className="h-6 w-6" />
              <span className="text-sm">
                Pastikan kamu sudah menandai titik lokasi dengan benar pada
                alamat yang dipilih untuk pengantaran pesanan.
              </span>
            </div>
            <div className="flex flex-col bg-white p-5 rounded-sm">
              <div className="rounded-t-sm bg-gray-200 flex  items-center px-5 py-2">
                <div>Products</div>
              </div>
              {cart &&
                cart.length > 0 &&
                cart.map((item) => (
                  <CheckoutListProduct key={item.id} cartItem={item} />
                ))}
              <div className="rounded-b-sm bg-gray-200 flex items-center gap-1 py-2">
                <div className="flex w-1/2 justify-end">
                  <p>SUBTOTAL:</p>
                </div>
                <div className="flex w-1/2 justify-end pr-5">
                  <p>{formatToRupiah(totalCartPrice)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex lg:flex-col space-y-5 w-1/4 sticky top-1 h-screen">
            <CheckoutAddress />
            <CheckoutTotal onNextStep={onNextStep} />
            <CheckoutVoucher />
          </div>
        </div>
      </div>
    </div>
  );
};
