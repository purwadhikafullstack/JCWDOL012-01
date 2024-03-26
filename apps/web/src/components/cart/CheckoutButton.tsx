'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatToRupiah } from '@/lib/formatToRupiah';
import LoadingPage from '../LoadingPage';

export const CheckoutButton = ({
  totalCartPrice,
}: {
  totalCartPrice: number;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = () => {
    setIsLoading(true);
    router.push('/checkout');
  };

  return (
    <div className="flex justify-between mt-5">
      <div className="flex flex-col font-semibold text-base">
        <p>Total pembayaran</p>
        <p className="font-semibold">{formatToRupiah(totalCartPrice)}</p>
      </div>
      {isLoading ? (
        <>
          <LoadingPage />
          <button
            onClick={handleCheckout}
            className={`p-3 bg-black rounded-md text-white ${
              isLoading ? 'cursor-not-allowed opacity-50' : ''
            }`}
            disabled={isLoading}
          >
            Loading...
          </button>
        </>
      ) : (
        <button
          onClick={handleCheckout}
          className={`p-3 bg-black rounded-md text-white`}
          disabled={isLoading}
        >
          Checkout
        </button>
      )}
    </div>
  );
};
