import { FaPlus } from 'react-icons/fa';

export const CheckoutAddProduct = () => {
  return (
    <div>
      <button className="flex items-center p-3 border rounded-sm space-x-1">
        <FaPlus className="h-4 w-4" />
        <span>Tambah Pesanan Lagi</span>
      </button>
    </div>
  );
};
