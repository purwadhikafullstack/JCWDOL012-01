import { useEffect, useMemo } from 'react';
import { IoInformationCircle } from 'react-icons/io5';
import { CheckoutListProduct } from './CheckoutListProduct';
import { CheckoutTotal } from './CheckoutTotal';
import { ModalVoucher } from './ModalVoucher';
import { useCart } from '@/provider/CartProvider';
import { formatToRupiah } from '@/lib/formatToRupiah';
import { CheckoutAddress } from './ModalAddress';
import { BsCartX } from 'react-icons/bs';
import { useCheckout } from '@/hooks/useCheckout';

interface CheckoutProductSelectionProps {
  onNextStep: () => void;
}

export const CheckoutProductSelection: React.FC<
  CheckoutProductSelectionProps
> = ({ onNextStep }) => {
  const { cart } = useCart();
  const { addOrderItems } = useCheckout();

  useEffect(() => {
    addOrderItems(cart);
  }, [cart]);

  const totalCartPrice = useMemo(() => {
    return cart.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0,
    );
  }, [cart]);

  return (
    <div className="bg-gray-100">
      <div className="wrapper flex w-full gap-20 justify-center">
        <div className="flex flex-col w-full lg:w-3/4 space-y-5">
          <div className="bg-blue-100 p-1 text-black flex gap-1 items-center rounded-md">
            <IoInformationCircle className="h-6 w-6" />
            <span className="text-sm">
              Pastikan kamu sudah menandai titik lokasi dengan benar pada alamat
              yang dipilih untuk pengantaran pesanan.
            </span>
          </div>
          <div className="flex flex-col bg-white p-5 rounded-sm">
            {cart && cart.length > 0 && (
              <>
                <div className="rounded-t-sm bg-gray-200 flex items-center px-5 py-2">
                  <div>Products</div>
                </div>
                {cart.map((item) => (
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
              </>
            )}
            {cart && cart.length === 0 && (
              <div className="flex flex-col justify-center items-center gap-5">
                <BsCartX className="h-56 w-56" />
                <p className="text-xl font-bold">Keranjang kamu masih kosong</p>
                <p className="text-base">
                  Yuk, segera cari produk yang kamu butuhkan!
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-col space-y-5 w-1/4 sticky top-1 h-screen">
          <CheckoutAddress />
          <CheckoutTotal onNextStep={onNextStep} />
          <ModalVoucher />
        </div>
      </div>
    </div>
  );
};
