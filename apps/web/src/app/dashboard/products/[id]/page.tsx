import DeleteProduct from '@/components/dashboard/DeleteProduct';
import EditProduct from '@/components/dashboard/EditProduct';
import { ArrowLeftToLine } from 'lucide-react';
import Link from 'next/link';

export default function AdminProductDetails({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto py-10 space-y-4">
      <Link href={'/dashboard/products'}>
        <ArrowLeftToLine className="w-4 h-4 cursor-pointer" />
      </Link>
      <div className="flex justify-between">
        <div className="text-3xl font-extrabold">
          Update Product{' '}
          <span className="opacity-50 text-base font-medium">
            (Product id: {id})
          </span>
        </div>
        <DeleteProduct id={id} />
      </div>
      <EditProduct id={id} />
    </div>
  );
}
