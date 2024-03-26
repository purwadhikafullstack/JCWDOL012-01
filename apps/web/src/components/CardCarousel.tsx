import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Store } from 'lucide-react';
import Image from 'next/image';

export function CardCarousel() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 basis-1/3 lg:basis-1/6">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-1 cursor-pointer">
                  <div className="flex flex-col space-y-1">
                    <Image
                      src="/indomie.jpg"
                      alt="productimg"
                      width={100}
                      height={100}
                      className="mx-auto"
                    />
                    <span className="text-sm">Indomie Goreng</span>
                    <div className="flex items-center gap-1 text-sm ">
                      <Store className="w-3 h-3" />
                      <p className="">Cianjur</p>
                    </div>
                    <span className="text-base font-semibold">Rp 36.000</span>
                    <button className="flex border border-blue-500 text-blue-500 rounded-sm py-1 px-3 md:px-4 gap-2 items-center">
                      <span>+</span>
                      <span>Keranjang</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
