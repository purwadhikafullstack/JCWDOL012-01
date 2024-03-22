'use client';

import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import useStoreInventoryDetails from '@/hooks/useStoreInventoryDetails';
import Link from 'next/link';
import { ArrowLeftToLine, History } from 'lucide-react';

type Props = {
  params: {
    storeId: string;
    productId: string;
  };
};

export default function InventoryDetailsDashboard({
  params: { storeId, productId },
}: Props) {
  const { data, isLoading, isError } = useStoreInventoryDetails({
    storeId,
    productId,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Not Found</div>;

  const stockLogs = data?.results?.stocklogs?.map((stockLog: any) => {
    console.log(stockLog);
    return {
      id: stockLog.id,
      inventoryId: data?.results?.id,
      typeLog: stockLog?.typeLog,
      quantity: stockLog?.quantity,
      createdAt: stockLog?.createdAt,
      updatedAt: stockLog?.updatedAt,
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
              Stock Logs
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of stock logs {data?.results?.product?.name}!
            </p>
          </div>
        </div>
        <DataTable data={stockLogs} columns={columns} />
      </div>
    </>
  );
}
