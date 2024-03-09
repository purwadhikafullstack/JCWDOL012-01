import { formatToRupiah } from '@/lib/formatToRupiah';
import { useCart } from '@/provider/CartProvider';
import { useMemo } from 'react';

interface CheckoutTotalProps {
  onNextStep: () => void;
}

export const CheckoutTotal: React.FC<CheckoutTotalProps> = ({ onNextStep }) => {
  const { cart } = useCart();

  const totalCartPrice = useMemo(() => {
    return cart.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0,
    );
  }, [cart]);

  return (
    <div className="border p-5 flex flex-col gap-5 rounded-md bg-white">
      <div className="flex justify-between text-gray-400">
        <span className="text-sm">Total Harga Pesanan</span>
        <span className="text-sm">{formatToRupiah(totalCartPrice)}</span>
      </div>
      <div className=" border-gray-400 border" />
      <div className="flex justify-between text-red-400">
        <span className="text-sm">Total Diskon</span>
        <span className="text-sm">(Rp 50.000)</span>
      </div>
      <div className=" border-gray-400 border " />
      <div className="flex justify-between font-bold">
        <span className="text-sm">Total Pembayaran</span>
        <span className="text-sm">{formatToRupiah(totalCartPrice)}</span>
      </div>
      <button
        className="py-2 rounded-sm bg-blue-500 text-white font-bold"
        onClick={onNextStep}
      >
        Pilih Opsi Pengiriman
      </button>
    </div>
  );
};
