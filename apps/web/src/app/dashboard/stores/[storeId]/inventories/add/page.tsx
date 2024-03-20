'use client';

import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import Link from 'next/link';
import { ArrowLeftToLine, History } from 'lucide-react';
import useProducts from '@/hooks/useProducts';
import { useState } from 'react';

type Props = {
  params: {
    storeId: string;
  };
};

export default function InventoryDetailsDashboard({
  params: { storeId },
}: Props) {
  const { data, isLoading, refetch } = useProducts();

  if (isLoading) return <div>Loading...</div>;

  const filteredProducts = data?.results?.filter((product: any) => {
    const storeIds: string[] = product?.product_inventories?.map(
      (inventory: any) => String(inventory.store_id),
    );
    return !storeIds.includes(storeId);
  });

  const products = filteredProducts?.map((product: any) => {
    return {
      productId: product?.id,
      name: product?.name,
      price: product?.price,
      weight: product?.weight,
      category: product?.category?.name,
    };
  });

  return (
    <>
      <div className="hidden w-1/2 h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <Link href={`/dashboard/stores/${storeId}/inventories`}>
          <ArrowLeftToLine className="w-4 h-4 cursor-pointer" />
        </Link>
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <History />
              Add Product to Store
            </h2>
            <p className="text-muted-foreground">
              {/* Here&apos;s a list of stock logs {data?.results?.product?.name}! */}
            </p>
          </div>
        </div>
        <DataTable
          data={products}
          columns={columns}
        />
      </div>
    </>
  );
}
