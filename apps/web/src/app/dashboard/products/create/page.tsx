import CreateProduct from '@/components/dashboard/CreateProduct';
import { ArrowLeftToLine } from 'lucide-react';
import Link from 'next/link';

export default function CreateProductPage() {
  return (
    <div className="container mx-auto py-10 space-y-4">
      <Link href={'/dashboard/products'}>
        <ArrowLeftToLine className="w-4 h-4 cursor-pointer" />
      </Link>
      <div className="text-3xl font-extrabold">Create New Product</div>
      <CreateProduct />
    </div>
  );
}
