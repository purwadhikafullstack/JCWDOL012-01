import React from 'react';
import { FaTrashCan } from 'react-icons/fa6';
export const CheckoutDeleteProduct = () => {
  return (
    <div>
      <button className="flex items-center p-3 border rounded-sm space-x-1">
        <FaTrashCan className="h-4 w-4" />
        <span>Hapus Semua Produk</span>
      </button>
    </div>
  );
};
