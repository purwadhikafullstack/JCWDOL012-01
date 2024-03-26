'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import useCreateCart from '@/hooks/useCreateCart';
import { useCookies } from 'next-client-cookies';
import { AuthModal } from '../AuthModal';
import { toast } from '../ui/use-toast';
import { useCart } from '@/provider/CartProvider';
import DialogLogin from '../DialogLogin';
import { useDialog } from '@/hooks/useDialog';
import DialogForm from '../DialogRegister';

export const AddToCart = ({
  storeId,
  productId,
}: {
  storeId: string;
  productId: string;
}) => {
  const { refetch } = useCart();
  const { mutate, isPending } = useCreateCart();
  const { onOpenRegister, onOpenLogin } = useDialog();
  const [quantity, setQuantity] = useState<number>(1);
  const cookies = useCookies();
  const token = cookies.get('token');

  const handleAddToCart = () => {
    if (!token) {
      return onOpenLogin();
    }
    return mutate(
      { storeId, productId, quantity },
      {
        onSuccess: (res: any) => {
          toast({
            variant: 'success',
            title: `Produk berhasil ditambahkan!`,
          });
        },
        onError: (res: any) => {
          toast({
            variant: 'destructive',
            title: `${res?.response?.data?.message}`,
            description: `Produk ${res?.response?.data?.result?.product.name} stock tersisa: ${res?.response?.data?.result?.quantity}`,
          });
          refetch();
        },
      },
    );
  };

  return (
    <div>
      <div className="flex bg-white rounded-md p-4 gap-4 items-center">
        <Button
          onClick={() => {
            if (quantity > 1) {
              setQuantity((prev) => prev - 1);
            }
          }}
        >
          -
        </Button>
        <span className="w-10 h-10 rounded-md border-2 border-slate-200 flex items-center justify-center">
          {quantity}
        </span>
        <Button
          onClick={() => {
            setQuantity((prev) => prev + 1);
          }}
        >
          +
        </Button>
        <Button
          className="bg-blue-700 text-white py-2 px-10 font-semibold rounded-sm space-x-2"
          onClick={handleAddToCart}
          disabled={isPending}
        >
          <span className="text-xl">+</span>
          <span className="text-base">Keranjang</span>
        </Button>
      </div>
      <DialogForm />
    </div>
  );
};
