'use client';

import { Button } from '@/components/ui/button';
import { columns } from './column';
import { DataTable } from './data-table';
import useProducts from '@/hooks/useProducts';
import { CircleFadingPlus, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useSession from '@/hooks/useSession';

export default function DashboardCatalog() {
  const router = useRouter();
  const { data, isError, isLoading } = useProducts();
  const { session } = useSession();

  if (isLoading) return <div>Loading...</div>;

  const products = data?.results.map((product: any, index: number) => ({
    no: index + 1,
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
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <Package />
            Product List
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all product catalog, you can add into your
            store!
          </p>
        </div>
      </div>
      {session?.role == 'Super_Admin' && (
        <Button
          className="flex gap-2"
          onClick={() => router.push('/dashboard/products/create')}
        >
          <CircleFadingPlus className="w-4 h-4" />
          Create Product
        </Button>
      )}
      <DataTable columns={columns} data={products} />
    </div>
  );
}
