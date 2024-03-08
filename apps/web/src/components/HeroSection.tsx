'use client';
import React from 'react';
import CarouselImage from './CarouselImage';
import CardProduct from './CardProduct';
import CardBenefit from './CardBenefit';

export default function HeroSection() {
  return (
    <>
      <div className="flex justify-center">
        <CarouselImage />
      </div>
      <div>
        <CardProduct />
      </div>
      <div>
        <CardBenefit />
      </div>
    </>
  );
}
