'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const CardProduct: React.FC = () => {
  // Menentukan jumlah total item
  const totalItems = 8; // Ubah menjadi 8

  return (
    <div className="flex justify-center items-center h-full">
      <Carousel opts={{ align: 'start' }} className="w-full max-w-sm">
        <CarouselContent className="flex">
          {/* Membuat item kartu sebanyak totalItems */}
          {Array.from({ length: totalItems }).map((_, index) => (
            <CarouselItem key={index} className="w-1/4 px-1">
              <div className="w-full">
                <Card>
                  <CardContent className="flex items-center justify-center p-6">
                    <img
                      className="object-cover w-full h-full"
                      src={`https://via.placeholder.com/150?text=Product${
                        index + 1
                      }`}
                      alt={`Product ${index + 1}`}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CardProduct;
