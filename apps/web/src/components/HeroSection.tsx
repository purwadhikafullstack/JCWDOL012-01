import React from 'react';
import CarouselImage from './CarouselImage';
import { CarouselProduct } from './CarouselProduct';

export default function HeroSection() {
  return (
    <>
      <div className="flex justify-center">
        <CarouselImage />
      </div>
      <div>
        <CarouselProduct />
      </div>
    </>
  );
}
