import { useCheckout } from '@/hooks/useCheckout';
import useGetAddress from '@/hooks/useGetAddress';
import { formatToRupiah } from '@/lib/formatToRupiah';
import { useCart } from '@/provider/CartProvider';
import { Dispatch, SetStateAction } from 'react';

interface CheckoutTotalProps {
  onNextStep: () => void;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const CheckoutTotal: React.FC<CheckoutTotalProps> = ({
  onNextStep,
  setShowModal,
}) => {
  const { totalPrice } = useCheckout();
  const { data: dataAddress, isLoading, isError } = useGetAddress();
  const { totalCart } = useCart();

  const handleNextStep = () => {
    if (dataAddress) {
      onNextStep();
    } else setShowModal(true);
  };

  return (
    <div className="border p-5 flex flex-col gap-5 rounded-md bg-white">
      <div className="flex justify-between text-gray-400">
        <span className="text-sm">Total Harga Pesanan</span>
        <span className="text-sm">{formatToRupiah(totalCart)}</span>
      </div>
      <div className=" border-gray-400 border" />
      <div className="flex justify-between text-red-400">
        <span className="text-sm">Total Diskon</span>
        <span className="text-sm">(Rp 0)</span>
      </div>
      <div className=" border-gray-400 border " />
      <div className="flex justify-between font-bold">
        <span className="text-sm">Total Pembayaran</span>
        <span className="text-sm">{formatToRupiah(totalPrice)}</span>
      </div>
      <button
        className="py-2 rounded-sm bg-blue-500 text-white font-bold"
        onClick={handleNextStep}
      >
        Pilih Opsi Pengiriman
      </button>
    </div>
  );
};
