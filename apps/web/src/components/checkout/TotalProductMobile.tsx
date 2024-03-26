import React from 'react';
import { ChevronUp } from 'lucide-react';

interface Props {
  step: number;
}

export const TotalProductMobile: React.FC<Props> = ({ step }) => {
  return (
    <div className="flex flex-col sm:hidden bg-white px-4 py-2 z-10 sticky bottom-0 gap-2 h-auto drop-shadow-[0_30px_35px_rgba(0,0,0,0.6)] ">
      <div className="flex justify-between text-sm">
        <div className="flex gap-1 items-center">
          <ChevronUp className="text-blue-500" />
          <p>Total Pembayaran</p>
        </div>
        <p>Rp 72.000</p>
      </div>
      {step === 1 && (
        <button className="bg-blue-500 text-white text-sm rounded-sm px-5 py-2">
          Pilih Opsi Pengiriman
        </button>
      )}
      {step === 2 && (
        <button className="bg-blue-500 text-white text-sm rounded-sm px-5 py-2">
          Pilih Pembayaran
        </button>
      )}
    </div>
  );
};
