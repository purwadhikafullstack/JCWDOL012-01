'use client';

import useStoreInventories from '@/hooks/useStoreInventories';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
// import path from 'path';
// import { promises as fs } from 'fs';

type Props = {
  params: {
    storeId: string;
  };
};

// async function getTasks() {
//   const data = await fs.readFile(
//     path.join('src/app/dashboard/stores/[storeId]/inventories/tasks.json'),
//   );

//   return JSON.parse(data.toString());
// }

export default function InventoryDashboard({ params: { storeId } }: Props) {
  // const tasks = await getTasks();
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

  return (
    <>
      <div className="hidden w-1/2 h-full flex-1 flex-col space-y-8 p-8 md:flex">
        {/* <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
        </div> */}
        <DataTable data={inventories} columns={columns} />
      </div>
    </>
  );
}
