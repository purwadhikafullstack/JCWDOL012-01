import { useCheckout } from '@/hooks/useCheckout';
import { ModalPayment } from './ModalPayment';
import { formatToRupiah } from '@/lib/formatToRupiah';
import { useCart } from '@/provider/CartProvider';

export const CheckoutTotalShipment = () => {
  const { totalPrice, shipment } = useCheckout();
  const { totalCart } = useCart();

  return (
    <div className="border p-5 flex flex-col gap-5 rounded-md bg-white">
      <div className="flex justify-between text-gray-400">
        <span className="text-sm">Total Harga Pesanan</span>
        <span className="text-sm">{formatToRupiah(totalCart)}</span>
      </div>
      <div className="flex justify-between text-gray-400">
        <span className="text-sm">Ongkos Kirim</span>
        <span className="text-sm">{formatToRupiah(shipment.amount)}</span>
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
      <ModalPayment />
    </div>
  );
};
