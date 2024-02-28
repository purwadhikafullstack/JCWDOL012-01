import Image from 'next/image';
import React from 'react';
import { FaTrashCan } from 'react-icons/fa6';
export const CheckoutListProduct = () => {
  return (
    <div className="border py-2 px-5 bg-white">
      <div className="flex gap-4 flex-col justify-between md:flex-row">
        <div>
          <Image src="/kamera.jpg" alt="imgproduct" height={100} width={100} />
        </div>
        <div className="flex items-center">
          <p className="text-sm font-semibold">
            Wall'S,Ice Cream Magnum Matcha Crumble 80ml Pck
          </p>
        </div>
        <div className="flex items-end">
          <p>Rp.10.000</p>
        </div>
        <div className="flex flex-col justify-between items-center">
          <div>Qty</div>
          <div className="flex">
            <button className="w-6 h-6 rounded-sm border border-gray-400 flex items-center justify-center">
              +
            </button>
            <span className="border-b px-5">2</span>
            <button className="w-6 h-6 rounded-sm border border-gray-400 flex items-center justify-center">
              -
            </button>
          </div>
        </div>
        <div className="flex items-end">
          <p>Rp.10.000</p>
        </div>
      </div>
      <div className="flex justify-end py-2">
        <FaTrashCan />
      </div>
    </div>
  );
};
