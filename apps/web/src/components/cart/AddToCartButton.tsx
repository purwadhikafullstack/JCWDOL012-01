'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useCreateCart from '@/hooks/useCreateCart';
import { useCookies } from 'next-client-cookies';
import { AuthModal } from '../AuthModal';

export const AddToCartButton = ({
  storeId,
  productId,
}: {
  storeId: string;
  productId: string;
}) => {
  const [cartStockModal, setCartStockModal] = useState(true);
  const { mutate, isPending, errorMessage } = useCreateCart();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const cookies = useCookies();
  const token = cookies.get('token');

  const handleAddToCart = () => {
    if (!token) {
      return setAuthModalOpen(true);
    }
    return mutate({ storeId, productId, quantity: 1 });
  };

  if (errorMessage && cartStockModal) {
    setCartStockModal(false);
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger
          className="bg-blue-700 text-white py-2 px-10 font-semibold rounded-sm space-x-2"
          onClick={handleAddToCart}
          disabled={isPending}
        >
          <span className="text-xl">+</span>
          <span className="text-base">Keranjang</span>
        </DialogTrigger>
        {!authModalOpen && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {cartStockModal ? 'Barang Berhasil Ditambahkan' : errorMessage}
              </DialogTitle>
            </DialogHeader>
          </DialogContent>
        )}
        {authModalOpen && <AuthModal />}
      </Dialog>
    </div>
  );
};
