'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const CartStockModal = () => {
  const [stockAvailable, setStockAvailable] = useState(false);
  const [cartStockModal, setCartStockModal] = useState(false);

  const handleCheckStock = () => {
    if (stockAvailable) setCartStockModal(true);
    else setCartStockModal(false);
  };

  return (
    <Dialog>
      <DialogTrigger onClick={handleCheckStock}>Add To Cart</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {cartStockModal
              ? 'Barang Berhasil Ditambahkan'
              : 'Stok Barang Tidak Tersedia'}
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
