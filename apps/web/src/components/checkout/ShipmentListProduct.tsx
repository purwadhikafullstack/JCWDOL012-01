import { CartItem } from '@/utils/cartTypes';
import Image from 'next/image';
import React from 'react';

interface Props {
  cartItem: CartItem;
}

export const ShipmentListProduct = ({ cartItem }: Props) => {
  return (
    <div className="flex w-full max-h-28 min-h-28">
      <div className="flex w-1/2 pr-2 pt-0 pl-0 space-x-10">
        <Image src={cartItem.image} alt="imgproduct" height={100} width={100} />
        <p className="text-sm font-bold pt-2">{cartItem.name}</p>
      </div>
      <div className="flex flex-col w-1/2 items-end justify-center  text-base">
        <p className="text-base">{cartItem.quantity}x</p>
      </div>
    </div>
  );
};
