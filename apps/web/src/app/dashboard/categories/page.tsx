'use client';

import useCategories from '@/hooks/useCategories';
import { columns } from './column';
import { DataTable } from './data-table';
import CreateCategory from '@/components/dashboard/CreateCategory';
import { NotepadText } from 'lucide-react';
import useSession from '@/hooks/useSession';

export default function DashboardCategories() {
  const { data, isError, isLoading } = useCategories();
  const { session } = useSession();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error while fetching data</div>;

  const categories = data?.results.map((category: any) => ({
    id: category.id,
    name: category.name,
    totalProduct: category?.products?.length,
  }));

  return (
    <div className="hidden w-1/2 h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <NotepadText />
            Category List
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all categories!
          </p>
          <div className="mt-4">
            {session?.role == 'Super_Admin' && <CreateCategory />}
          </div>
        </div>
      </div>
      <DataTable columns={columns} data={categories} />
    </div>
  );
}
