import React from 'react';
import { ModalDetailOrder } from './ModalDetailOrder';
import { IoCloseCircle } from 'react-icons/io5';
import Image from 'next/image';

export const DetailOrder = () => {
  return (
    <div className="flex rounded-xl border overflow-hidden">
      <div className="flex items-center justify-center bg-red-200 ">
        <IoCloseCircle className="w-10 h-10" />
      </div>
      <div className="flex flex-col p-2 gap-1 items-start w-2/3">
        <p>Pesanan INV-20240318-47</p>
        <p>17 Maret 2024</p>
        <div className="flex gap-1 items-center justify-center">
          <Image src="/kamera.jpg" alt="img" width={100} height={100} />
          <p>Nama product</p>
        </div>
      </div>
      <div className="flex flex-col p-2 gap-2 items-end justify-start w-1/3">
        <p className="text-lg">Subtotal Pembayaran</p>
        <p className="text-2xl text-orange-400">Rp 16.600</p>
        <ModalDetailOrder />
      </div>
    </div>
  );
};
