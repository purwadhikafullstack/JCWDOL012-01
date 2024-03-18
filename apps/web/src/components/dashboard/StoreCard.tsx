import { MapPin, ShoppingBag, Store, UserCog } from 'lucide-react';
import { Button, buttonVariants } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
  id: number;
  street: string;
  city: string;
  province: string;
  admin: string;
  totalInventory: number;
};

export default function StoreCard({
  id,
  street,
  city,
  province,
  admin,
  totalInventory,
}: Props) {
  return (
    <Card className="">
      <CardHeader className="space-y-4">
        <CardTitle className="mx-auto">
          <Store className="w-8 h-8" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <MapPin />
          <span>{`${street}, ${city}, ${province}`}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <UserCog />
          <span>{admin}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <ShoppingBag />
          <span>{totalInventory} products</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link
          href={`/dashboard/stores/${id}`}
          className={cn(buttonVariants(), 'w-full h-8')}
        >
          View Inventory
        </Link>
      </CardFooter>
    </Card>
  );
}
