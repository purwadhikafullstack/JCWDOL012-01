import { Navbar } from '@/components/Navbar';
import { DateOrder } from '@/components/listOrder/DateOrder';
import { FilterOrder } from '@/components/listOrder/FilterOrder';
import { IoCloseCircle } from 'react-icons/io5';
import React from 'react';
import Image from 'next/image';
import { ModalDetailOrder } from '@/components/listOrder/ModalDetailOrder';
import { DetailOrder } from '@/components/listOrder/DetailOrder';

const OrderPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex bg-gray-100 md:justify-center h-screen">
        <div className=" bg-white flex flex-col p-5 gap-3 mx-3 w-full md:w-2/3 rounded-md mt-10 h-fit">
          <p className="text-2xl font-semibold">Daftar Transaksi</p>
          <div className="flex justify-between">
            <div className="flex gap-5">
              <input
                placeholder="Cari Transaksimu Disini"
                type="search"
                className="border border-slate-200 rounded-sm p-2 items-start"
              />
              <DateOrder />
            </div>
            <FilterOrder />
          </div>
          <DetailOrder />
        </div>
      </div>
    </>
  );
};

export default OrderPage;
