// 'use client';

import useStoreInventories from '@/hooks/useStoreInventories';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import path from 'path';
import { promises as fs } from 'fs';

type Props = {
  params: {
    storeId: string;
  };
};

async function getTasks() {
  const data = await fs.readFile(
    path.join('src/app/dashboard/stores/[storeId]/inventories/tasks.json'),
  );

  return JSON.parse(data.toString());
}

export default async function InventoryDashboard() {
  const tasks = await getTasks();

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
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
