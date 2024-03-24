'use client';

import Image from 'next/image';
import HeroSection from '@/components/HeroSection';
// // Open Location Based Pop Up in website
// const successCallback = (position: any) => {
//   console.log(position);
//   localStorage: position;
// };

// const errorCallback = (error: any) => {
//   console.log(error);
// };

// navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
// // Close Location Based Pop Up in website
export default function Home() {
  return (
    <div>
      <HeroSection />
    </div>
  );
}
