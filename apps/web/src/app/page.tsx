'use client';

import HeroSection from '@/components/HeroSection';
import { useEffect } from 'react';
export default function Home() {
  // Open Location Based Pop Up in website
  const successCallback = (position: any) => {
    console.log(position);
    // localStorage: position;
  };

  const errorCallback = (error: any) => {
    console.log(error);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    // Close Location Based Pop Up in website
  }, []);
  
  return (
    <div>
      <HeroSection />
    </div>
  );
}
