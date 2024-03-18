import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const totalProduct = 12; // total product used

export function CardProduct() {
  return (
    <div className="flex flex-col items-center">
      {' '}
      {/* Centering the text and carousel */}
      <h1 className="text-2xl font-semibold mb-4">Minuman</h1>
      <div className=" flex justify-center">
        {/* open size card carousel */}
        <Carousel className="w-full max-w-5xl">
          {/*close size card carousel  */}
          <CarouselContent className="-ml-1">
            {Array.from({ length: totalProduct }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/6 " // add card on display
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-2xl font-semibold">
                        {index + 1}
                      </span>
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
    </div>
  );
}
