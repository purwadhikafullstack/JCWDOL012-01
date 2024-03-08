import React from 'react';
import { CheckoutTotal } from './CheckoutTotal';
import { CheckoutTotalCopy } from './CheckoutTotal copy';
import { SelectShipment } from './SelectShipment';
import { ShipmentListProduct } from './ShipmentListProduct';

export const CheckoutShipment = () => {
  return (
    <div>
      <div className="bg-gray-100">
        <div className="wrapper flex w-full gap-20 justify-center">
          <div className="flex flex-col w-full lg:w-3/4 space-y-5">
            <div className="bg-blue-100 pt-2 pb-5 px-5 text-black flex flex-col items-center gap-1 rounded-lg">
              <div className="flex justify-between w-full text-xs">
                <p className="">Kirim ke:</p>
                <button className=" font-bold text-blue-500">
                  Ganti Alamat {'>'}
                </button>
              </div>
              <div className="flex flex-col justify-between bg-white border rounded-sm w-full p-3 gap-3">
                <div className="font-bold text-base">Label</div>
                <div className="text-sm">nama (xxxxxxx)</div>
                <div className="text-sm">street , city province</div>
              </div>
            </div>
            <div className="flex flex-col bg-white p-5 rounded-sm gap-3">
              <p className="font-bold text-base">Metode Pengiriman</p>
              <SelectShipment />
              <div className="flex justify-between">
                <p className="font-bold text-base">Pesanan</p>
                <p className="text-gray-400 text-base">1 Qty</p>
              </div>
              <ShipmentListProduct />
            </div>
          </div>
          <div className="hidden lg:flex lg:flex-col space-y-5 w-1/4 sticky top-1 h-screen">
            <CheckoutTotalCopy />
          </div>
        </div>
      </div>
    </div>
  );
};
