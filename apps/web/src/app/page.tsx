'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import HeroSection from '@/components/HeroSection';

const successCallback = (position: any) => {
  console.log(position);
  localStorage: position;
};

const errorCallback = (error: any) => {
  console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

export default function Home() {
  return (
    <div>
      <HeroSection />
    </div>
  );
}
