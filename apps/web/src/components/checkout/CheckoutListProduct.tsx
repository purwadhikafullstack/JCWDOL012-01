import { formatToRupiah } from '@/lib/formatToRupiah';
import { CartItem } from '@/utils/cartTypes';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import ModalConfirmDelete from '../cart/ModalConfirmDelete';
import { useCart } from '@/provider/CartProvider';
import useUpdateCart from '@/hooks/useUpdateCart';
import useDeleteCart from '@/hooks/useDeleteCart';

interface Props {
  cartItem: CartItem;
}

export const CheckoutListProduct = ({ cartItem }: Props) => {
  const { setCart } = useCart();
  const { mutate, isPending } = useUpdateCart();
  const { mutate: deleteCart, isPending: isDeletePending } = useDeleteCart();
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
    <div className="border py-2 px-5 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex gap-5 w-96">
          <Image src={cartItem.image} alt="imgproduct" height={70} width={70} />
          <div className="flex justify-start items-center">
            <p className="text-sm font-semibold">{cartItem.name}</p>
          </div>
        </div>
        <div className="flex justify-center w-24">
          <p>{formatToRupiah(Number(cartItem.price))}</p>
        </div>
        <div className="flex w-32 justify-between">
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
        <div className="flex justify-center w-24">
          <p>{formatToRupiah(Number(cartItem.price) * cartItem.quantity)}</p>
        </div>
        <div>
          <button onClick={handleDeleteCart}>
            <FaTrashCan className="text-red-500" />
          </button>
        </div>
      </div>
      {confirmDelete && (
        <ModalConfirmDelete
          onConfirm={() => {
            deleteCart(cartItem.id);
            setCart((prevCart) =>
              prevCart.filter((cart) => cart.id !== cartItem.id),
            );
          }}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </div>
  );
};
