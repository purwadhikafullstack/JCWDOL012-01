import { useEffect, useMemo, useState } from 'react';
import { IoInformationCircle } from 'react-icons/io5';
import { CheckoutListProduct } from './CheckoutListProduct';
import { CheckoutTotal } from './CheckoutTotal';
import { ModalVoucher } from './ModalVoucher';
import { useCart } from '@/provider/CartProvider';
import { formatToRupiah } from '@/lib/formatToRupiah';
import { ModalAddress } from './ModalAddress';
import { BsCartX } from 'react-icons/bs';
import { useCheckout } from '@/hooks/useCheckout';
import { ModalAddressNotFound } from './ModalAddressNotFound';
import { CardCarousel } from '../CardCarousel';
import LoadingComponent from '../LoadingComponent';

interface CheckoutProductSelectionProps {
  onNextStep: () => void;
}

export const CheckoutProductSelection: React.FC<
  CheckoutProductSelectionProps
> = ({ onNextStep }) => {
  const { cart, isLoading, totalCart } = useCart();
  const { addOrderItems } = useCheckout();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    addOrderItems(cart);
  }, [cart, addOrderItems]);

  return (
    <div className="">
      <div className="wrapper mt-8 lg:mt-0 flex w-full gap-10 h-auto">
        <div
          className={`flex flex-col w-full lg:${
            !Array.isArray(cart) ? 'w-full' : 'w-3/4'
          } space-y-5`}
        >
          <div className=" bg-blue-100 p-2 text-black flex gap-1 items-center rounded-md">
            <div className="h-[23px] w-[23px]">
              <IoInformationCircle className="h-[23px] w-[23px]" />
            </div>
            <span className="text-[13px]">
              Pastikan kamu sudah menandai titik lokasi dengan benar pada alamat
              yang dipilih untuk pengantaran pesanan.
            </span>
          </div>
          <div
            className={`relative p-3 sm:p-5 rounded-sm ${
              !Array.isArray(cart) ? 'w-full' : 'bg-white'
            } ${isLoading ? 'h-60' : ''}`}
          >
            {isLoading && <LoadingComponent />}
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
                    <p>{formatToRupiah(totalCart)}</p>
                  </div>
                </div>
              </>
            )}
            {!Array.isArray(cart) && (
              <div className="flex flex-col justify-center items-center gap-5">
                <BsCartX className="h-56 w-56" />
                <p className="text-xl font-bold">Keranjang kamu masih kosong</p>
                <p className="text-base">
                  Yuk, segera cari produk yang kamu butuhkan!
                </p>
              </div>
            )}
          </div>
          <div className="bg-white rounded-sm flex flex-col py-2 px-3 lg:px-5">
            <p className="mb-4">Tertarik dengan produk ini?</p>
            <div className="flex justify-center">
              <CardCarousel />
            </div>
          </div>
        </div>
        {cart && cart.length > 0 && (
          <div className="hidden lg:flex lg:flex-col space-y-5 w-1/4 sticky top-20 h-[618px]">
            <ModalAddress />
            <CheckoutTotal
              onNextStep={onNextStep}
              setShowModal={setShowModal}
            />
            <ModalVoucher />
          </div>
        )}
      </div>
      {showModal && (
        <ModalAddressNotFound
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};
