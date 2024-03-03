'use client';
import useUpdateCart from '@/hooks/useUpdateCart';
import { useCart } from '@/provider/CartProvider';
import { CartItem } from '@/utils/cartTypes';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import ModalConfirmDelete from './ModalConfirmDelete';
import { formatToRupiah } from '@/lib/formatToRupiah';

interface Props {
  cartItem: CartItem;
}

export const CartListProduct = ({ cartItem }: Props) => {
  const { removeFromCart } = useCart();
  const { mutate, isPending } = useUpdateCart();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteCart = () => {
    setConfirmDelete(true);
  };

  const handleUpdateCart = (quantity: number) => {
    const cartId = cartItem.id;
    if (cartItem.quantity + quantity === 0) {
      setConfirmDelete(true);
    } else {
      mutate({ cartId, quantity });
    }
  };

  return (
    <div className="flex w-full max-h-28 min-h-28">
      <div className="flex w-1/4 pr-2 pt-0 pl-0">
        <Image src={cartItem.image} alt="imgproduct" height={100} width={100} />
      </div>
      <div className="flex flex-col w-2/4 gap-2 justify-between ">
        <div className="flex h-10">
          <p className="text-lg font-semibold">{cartItem.name}</p>
        </div>
        <div>{formatToRupiah(Number(cartItem.price))}</div>
        <div className="flex">
          <button
            onClick={() => handleUpdateCart(-1)}
            disabled={isPending}
            className="w-6 h-6 rounded-sm border border-gray-400 flex items-center justify-center"
          >
            -
          </button>
          <span className="border-b px-5">{cartItem.quantity}</span>
          <button
            onClick={() => handleUpdateCart(1)}
            disabled={isPending}
            className="w-6 h-6 rounded-sm border border-gray-400 flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col w-1/4 items-end justify-between">
        <div>
          <button onClick={handleDeleteCart}>
            <RiDeleteBinLine className="h-6 w-6 cursor-pointer" />
          </button>
        </div>
        <div className="font-semibold">
          <p>{formatToRupiah(Number(cartItem.price) * cartItem.quantity)}</p>
        </div>
        {confirmDelete && (
          <ModalConfirmDelete
            onConfirm={() => removeFromCart(cartItem.id)}
            onCancel={() => setConfirmDelete(false)}
          />
        )}
      </div>
    </div>
  );
};
