'use client';
import { useState } from 'react';
import { CartStockModal } from './CartStockModal';

export const CartAddProduct = () => {
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockAvailable, setStockAvailable] = useState(false);

  const handleAddToCart = async () => {
    if (stockAvailable) {
      console.log('Produk berhasil ditambahkan ke keranjang.');
    } else {
      setShowStockModal(true);
    }
  };

  return (
    <div>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <div>{showStockModal && <CartStockModal />}</div>
    </div>
  );
};
