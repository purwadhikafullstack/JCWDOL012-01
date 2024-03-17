'use client';

import { Product, columns } from './column';
import { DataTable } from './data-table';
import CreateCategory from '@/components/dashboard/CreateCategory';
import useProducts from '@/hooks/useProducts';

export default function DashboardCatalog() {
  const { data, isError, isLoading } = useProducts();

  if (isLoading) return <div>Loading...</div>;

  const products = data?.results.map((product: any) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    weight: product.weight,
    category: product?.category?.name || 'null',
    updatedAt: product.updatedAt,
    createdAt: product.createdAt,
  }));

  return (
    <div className="container mx-auto py-10 space-y-2">
      {/* <CreateCategory /> */}
      <DataTable columns={columns} data={products} />
    </div>
  );
}
