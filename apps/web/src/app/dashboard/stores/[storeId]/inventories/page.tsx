'use client';

import useStoreInventories from '@/hooks/useStoreInventories';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import Link from 'next/link';
import { ArrowLeftToLine, Store } from 'lucide-react';

type Props = {
  params: {
    storeId: string;
  };
};

export default function InventoryDashboard({ params: { storeId } }: Props) {
  const { data, isLoading } = useStoreInventories({ id: storeId });

  if (isLoading) return <div>Loading...</div>;

  const inventories = data?.results?.products?.map((inventory: any) => {
    return {
      id: inventory?.id,
      productId: inventory?.product?.id,
      storeId: inventory?.store?.id,
      name: inventory?.product?.name,
      price: inventory?.product?.price,
      quantity: inventory?.quantity,
      createdAt: inventory?.createdAt,
      updatedAt: inventory?.updatedAt,
    };
  });

  const storeLocation = `${data?.results?.products[0]?.store?.street}, ${data?.results?.products[0]?.store?.city}, ${data?.results?.products[0]?.store?.province}`;

  return (
    <>
      <div className="hidden w-1/2 h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <Link href={`/dashboard/stores`}>
          <ArrowLeftToLine className="w-4 h-4 cursor-pointer" />
        </Link>
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <Store  />
              {storeLocation}</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of products on this store!
            </p>
          </div>
        </div>
        <DataTable data={inventories} columns={columns} />
      </div>
    </>
  );
}
