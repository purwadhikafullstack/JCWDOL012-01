'use client';
import React from 'react';
import CarouselImage from './CarouselImage';
import CardBenefit from './CardBenefit';
import { CardProduct } from './CardProduct';

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
