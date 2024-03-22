'use client';

import useProductDetails from '@/hooks/useProductDetails';
import { ScrollText, Store, TicketPercent } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '../ui/badge';

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

  const checkBogo = data?.results?.promotions?.find((promotion: any) => {
    return promotion?.promotion_type == 'Bogo';
  });

  const checkDiscount = data?.results?.promotions?.find((promotion: any) => {
    return promotion?.promotion_type == 'Discount';
  });

  let price = data?.results.product.price;

  if (checkDiscount) {
    if (checkDiscount?.discount_type == 'Amount') {
      price = price - checkDiscount?.amount;
    } else {
      price = price - (price * checkDiscount?.amount) / 100;
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-2 flex flex-col gap-2 lg:flex-row">
      {/* image */}
      <div className="space-y-4">
        <div className="bg-white rounded-md">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent>
              {data?.results?.product?.images?.map((image: any, i: number) => {
                return (
                  <CarouselItem key={i}>
                    <Image
                      src={image?.url}
                      alt="product image"
                      width={400}
                      height={400}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
          </Carousel>
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
          {checkBogo && (
            <Badge className="text-xl w-max bg-red-500 flex items-center gap-2">
              <TicketPercent />
              Buy 1 Get 1
            </Badge>
          )}
          <p className="text-xl font-semibold">{data?.results.product.name}</p>
          <div className="flex items-center gap-2 text-orange-500 text-2xl font-bold">
            {checkDiscount && (
              <Badge className="bg-red-500">
                <TicketPercent />
              </Badge>
            )}
            <span className={checkDiscount && 'text-slate-400 line-through'}>
              Rp. {data?.results.product.price}
            </span>
            {checkDiscount && <span>Rp. {price}</span>}
          </div>
          <p className="text-slate-500 font-medium">
            (Stock Tersisa: {data?.results.quantity})
          </p>
        </div>
        {/* add to cart */}
        <div className="bg-white rounded-md p-4 flex gap-4 items-center">
          <Button
            className="bg-blue-600"
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
            className="bg-blue-600"
            onClick={() => {
              if (quantity < data?.results.quantity) {
                setQuantity((prev) => prev + 1);
              }
            }}
          >
            +
          </Button>
          <Button className="bg-blue-600">Add to cart</Button>
        </div>
        {/* store info */}
        <div className="lg:hidden bg-white rounded-md p-4 flex items-center justify-start gap-4">
          <Store className="w-8 h-8" />
          <p className="font-semibold text-slate-800">
            {data?.results.store.city}, {data?.results.store.province}
          </p>
        </div>
        {/* category */}
        <div className="bg-white rounded-md p-4 space-y-4">
          <p className="text-xl font-semibold flex items-center gap-2">
            <ScrollText />
            Category
          </p>
          <Badge className="bg-blue-600 font-bold">
            {data?.results?.product?.category?.name}
          </Badge>
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
