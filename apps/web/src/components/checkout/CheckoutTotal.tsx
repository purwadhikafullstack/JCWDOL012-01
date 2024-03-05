export const CheckoutTotal = () => {
  return (
    <div className="border p-5 flex flex-col gap-5 rounded-md bg-white">
      <div className="flex justify-between text-gray-400">
        <span className="text-sm">Total Harga Pesanan</span>
        <span className="text-sm">Rp 50.000</span>
      </div>
      <div className=" border-gray-400 border" />
      <div className="flex justify-between text-red-400">
        <span className="text-sm">Total Diskon</span>
        <span className="text-sm">(Rp 50.000)</span>
      </div>
      <div className=" border-gray-400 border " />
      <div className="flex justify-between font-bold">
        <span className="text-sm">Total Pembayaran</span>
        <span className="text-sm">Rp 50.000</span>
      </div>
      <button className="py-2 rounded-sm bg-blue-500 text-white font-bold">
        Pilih Opsi Pengiriman
      </button>
    </div>
  );
};
