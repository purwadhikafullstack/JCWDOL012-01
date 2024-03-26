'use client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { FiMoreVertical } from 'react-icons/fi';
import { CheckoutAddProduct } from './CheckoutAddProduct';
import { CheckoutDeleteProduct } from './CheckoutDeleteProduct';

export const MenuCheckout = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex lg:hidden items-center">
          <span className="text-black font-bold">
            <FiMoreVertical />
          </span>
        </div>
      </SheetTrigger>
      <SheetContent side={'bottom'} className="rounded-lg">
        <div className="flex flex-col gap-5 items-center mt-5 sm:mt-0">
          <CheckoutAddProduct />
          <div className="border w-full border-gray-500"></div>
          <CheckoutDeleteProduct />
        </div>
      </SheetContent>
    </Sheet>
  );
};
