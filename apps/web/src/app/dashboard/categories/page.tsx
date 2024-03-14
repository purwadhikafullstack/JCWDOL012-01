'use client';

import useCategories from '@/hooks/useCategories';
import { columns } from './column';
import { DataTable } from './data-table';
import { Button } from '@/components/ui/button';
import { CircleFadingPlus } from 'lucide-react';
import CreateCategory from '@/components/dashboard/CreateCategory';

// async function getData(): Promise<Category[]> {
//   // Fetch data from your API here.
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`,
//     { method: 'GET', cache: 'no-cache' },
//   );
//   const { results: categories } = await res.json();

//   console.log(categories);
//   return categories.map((category: any) => ({
//     id: category.id,
//     name: category.name,
//     totalProduct: category?.products?.length,
//   }));
// }

export default function DemoPage() {
  const { data, isError, isLoading } = useCategories();

  if (isLoading) return <div>Loading...</div>;

  const categories = data?.results.map((category: any) => ({
    id: category.id,
    name: category.name,
    totalProduct: category?.products?.length,
  }));

  return (
    <div className="container mx-auto py-10 space-y-2">
      <CreateCategory />
      <DataTable columns={columns} data={categories} />
    </div>
  );
}
