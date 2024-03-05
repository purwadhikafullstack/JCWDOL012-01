'use client';

import useProductDetails from '@/hooks/useProductDetails';
import { Store } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useState } from 'react';

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

  const [quantity, setQuantity] = useState<number>(0);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-slate-100 p-2 flex flex-col gap-2">
      {/* image */}
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
        <Button
          onClick={() => {
            if (quantity > 0) {
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
            if (quantity < data?.results.quantity) {
              setQuantity((prev) => prev + 1);
            }
          }}
        >
          +
        </Button>
        <Button>Add to cart</Button>
      </div>
      {/* store info */}
      <div className="bg-white rounded-md p-4 flex items-center justify-start gap-4">
        <Store className="w-8 h-8" />
        <p className="font-semibold text-slate-800">
          {data?.results.store.city}, {data?.results.store.province}
        </p>
      </div>
      {/* description */}
      <div className="bg-white rounded-md p-4 space-y-4">
        <p className="text-xl font-semibold">Description</p>
        <p>
          {data?.results.product.description} Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Laboriosam reiciendis inventore eum aut,
          aspernatur quisquam sint nemo ipsum dicta quod assumenda earum iure.
          Expedita ratione deleniti possimus est, tenetur perferendis!
        </p>
      </div>
    </div>
  );
}
