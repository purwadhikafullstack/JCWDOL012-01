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

export default function Home() {
  return (
    <div>
      <HeroSection />
    </div>
  );
}
