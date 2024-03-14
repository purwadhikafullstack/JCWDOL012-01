import { RiCouponLine } from 'react-icons/ri';

export const CheckoutVoucher = () => {
  return (
    <div className="border p-5 flex flex-col gap-1 rounded-md bg-white">
      <span className="text-sm font-bold">Voucher/Kupon</span>
      <button className="border rounded-sm flex items-center gap-1 px-1 ">
        <RiCouponLine />
        <p className="text-gray-400">Gunakan Kupon</p>
      </button>
    </div>
  );
};
