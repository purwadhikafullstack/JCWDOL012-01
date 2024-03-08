'use client';

import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const imageData = [
  { src: '/Hero04.jpg', alt: 'Hero04' },
  { src: '/Hero01.jpg', alt: 'Hero01' },
  { src: '/Hero04.jpg', alt: 'Hero04' },
  // { src: '/Hero02.jpg', alt: 'Hero02' },
];

export default function CarouselImage() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );
  return (
    <Carousel
      plugins={[plugin.current]}
      className="container max-w-6xl py-28"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {imageData.map((image, index) => (
          <CarouselItem key={index}>
            <div className="flex overflow-hidden">
              <img
                className="static w-full rounded-lg"
                src={image.src}
                alt={image.alt}
                width={1000}
                height={1000}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
