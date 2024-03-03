'use client';

import { Navbar } from '@/components/Navbar';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
const page = () => {
  const { store, product } = useParams();

  useEffect;
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-5 wrapper">
        <div>store{store}</div>
        <div> product{product}</div>
        <AddToCartButton
          storeId={store as string}
          productId={product as string}
        />
      </div>
    </>
  );
};

export default page;
