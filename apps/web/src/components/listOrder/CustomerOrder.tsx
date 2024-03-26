'use client';
import React, { useState } from 'react';
import { DateOrder } from './DateOrder';
import { FilterOrder } from './FilterOrder';
import { DetailOrder } from './DetailOrder';
import UseGetOrders from '@/hooks/useGetOrders';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import LoadingComponent from '../LoadingComponent';

const UserOrder = ({
  invoice,
  currentPage,
  status,
  date,
}: {
  invoice: string;
  currentPage: number;
  status: string;
  date: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { data, isLoading, isError } = UseGetOrders({
    status: status,
    page: currentPage,
    invoice: invoice,
    date: date,
  });

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('invoice', term);
      params.delete('page');
    } else {
      params.delete('invoice');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 1000);

  return (
    <div className="relative bg-white flex flex-col gap-3">
      <div className="flex justify-between">
        <div className="flex gap-5">
          <input
            placeholder="Cari Transaksimu Disini"
            type="search"
            className="border border-slate-200 rounded-sm p-2 items-start"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <DateOrder />
        </div>
        <FilterOrder status={status} />
      </div>
      {isLoading && (
        <div className="bg-white h-[20vh]">
          <LoadingComponent />
        </div>
      )}
      {isError && <div>Not Found...</div>}
      {data &&
        data.result.map((order: any) => (
          <DetailOrder key={order.id} order={order} />
        ))}
      <div className="flex gap-4 justify-center items-center">
        <button
          className="border py-2 px-4 rounded"
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            if (currentPage > 1) {
              params.set('page', (currentPage - 1).toString());
            } else {
              params.delete('page');
            }
            router.replace(`${pathname}?${params.toString()}`);
          }}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>
        <span>{currentPage}</span>
        <button
          className="border py-2 px-4 rounded"
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            if (currentPage) {
              params.set('page', (currentPage + 1).toString());
            } else {
              params.delete('page');
            }
            router.replace(`${pathname}?${params.toString()}`);
          }}
          disabled={!data || !data.result || data.result.length < 6}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default UserOrder;
