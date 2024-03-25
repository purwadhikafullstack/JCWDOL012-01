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
    <div className="container mx-auto py-10 space-y-2">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <NotepadText />
            Category List
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all categories!
          </p>
        </div>
      </div>
      {session?.role == 'Super_Admin' && <CreateCategory />}
      <DataTable columns={columns} data={categories} />
    </div>
  );
}
