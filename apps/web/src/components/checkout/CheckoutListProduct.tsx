import { CartItem } from '@/utils/cartTypes';
import Image from 'next/image';
import React from 'react';
import { FaTrashCan } from 'react-icons/fa6';

interface Props {
  cartItem: CartItem;
}

export const CheckoutListProduct = ({ cartItem }: Props) => {
  return (
    <div className="border py-2 px-5 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex gap-5 w-96">
          <Image src={cartItem.image} alt="imgproduct" height={70} width={70} />
          <div className="flex justify-start items-center">
            <p className="text-sm font-semibold">Kopi Torabika 100ml</p>
          </div>
        </div>
        <div className="flex justify-center w-24">
          <p>Rp 100.000</p>
        </div>
        <div className="flex w-32 justify-between">
          <button className="w-6 h-6 rounded-sm border border-gray-400 flex items-center justify-center">
            -
          </button>
          <span className="border-b px-5">20</span>
          <button className="w-6 h-6 rounded-sm border border-gray-400 flex items-center justify-center">
            +
          </button>
        </div>
        <div className="flex justify-center w-24">
          <p>Rp.10.000</p>
        </div>
        <div>
          <FaTrashCan />
        </div>
      </div>
    </div>
  );
};
