'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FaLocationDot } from 'react-icons/fa6';
import { FaAngleDown } from 'react-icons/fa6';

export const CheckoutAdress = () => {
  return (
    <Dialog>
      <DialogTrigger className="">
        <div className="border px-5 py-1 text-black flex justify-between items-center rounded-md bg-white">
          <div className="flex gap-1">
            <FaLocationDot className="h-4 w-4" />
            <span className="text-sm">Dikirim ke: rumah,KENDAL</span>
          </div>
          <FaAngleDown className="h-4 w-4" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pilih alamat pengiriman</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
