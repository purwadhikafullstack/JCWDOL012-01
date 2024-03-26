'use client';

import useProductDetails from '@/hooks/useProductDetails';
import { Store } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { AddToCart } from '../cart/AddToCart';

type Props = {
  storeId: string;
  productId: string;
};

export default function ProductDetails({ storeId, productId }: Props) {
  const { data, isError, isLoading, refetch } = useProductDetails({
    storeId,
    productId,
  });
  console.log(data?.results);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-2 flex flex-col gap-2 lg:flex-row">
      {/* image */}
      <div className="space-y-4">
        <div className="bg-white rounded-md">
          <Image
            src={
              'https://excelso-coffee.com/wp-content/uploads/2020/07/excelso-Kalosi-Toraja-Biji-200g-2.jpg'
            }
            alt="product image"
            width={400}
            height={400}
          />
        </div>
        <div className="hidden lg:flex bg-white rounded-md p-4 items-center justify-start gap-4">
          <Store className="w-8 h-8" />
          <p className="font-semibold text-slate-800">
            {data?.results.store.city}, {data?.results.store.province}
          </p>
        </div>
      </div>

      <div className="space-y-2 lg:space-y-0 lg:flex lg:flex-col lg:gap-4 w-full">
        {/* name, price, stock */}
        <div className="bg-white rounded-md p-4 space-y-4">
          <p className="text-xl font-semibold">{data?.results.product.name}</p>
          <p className="text-orange-500 text-2xl font-bold">
            Rp. {data?.results.product.price}
          </p>
          <p className="text-slate-500 font-medium">
            (Stock Tersisa: {data?.results.quantity})
          </p>
        </div>
        {/* add to cart */}
        <div className="bg-white rounded-md p-4 flex gap-4 items-center">
          <AddToCart storeId={storeId} productId={productId} />
        </div>
        {/* store info */}
        <div className="lg:hidden bg-white rounded-md p-4 flex items-center justify-start gap-4">
          <Store className="w-8 h-8" />
          <p className="font-semibold text-slate-800">
            {data?.results.store.city}, {data?.results.store.province}
          </p>
        </div>
        {/* description */}
        <div className="bg-white rounded-md p-4 space-y-4">
          <p className="text-xl font-semibold">Description</p>
          <p>{data?.results.product.description}</p>
        </div>
      </div>
    </div>
  );
}
