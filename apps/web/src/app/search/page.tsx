'use client';

import { Button } from '@/components/ui/button';
import useProduct from '@/hooks/useProductsByName';
import { Store } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const key = searchParams.get('key');
  const page = searchParams.get('page');

  const { data, isLoading, isError } = useProduct({
    search: String(key),
    page: Number(page),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  console.log(data);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <p className="font-semibold text-lg">
        Hasil Pencarian Untuk &quot;{key}&quot;
      </p>
      <p className="text-sm text-slate-500">
        Menampilkan {data?.results.totalProduct} produk
      </p>

      <div className="flex flex-col lg:flex-row gap-8 mt-4">
        {data?.results.products.map((product: any, index: number) => {
          return (
            <div key={index} className="border-2 rounded-md p-4 space-y-2 mx-auto">
              <Image
                src={
                  'https://excelso-coffee.com/wp-content/uploads/2020/07/excelso-Kalosi-Toraja-Biji-200g-2.jpg'
                }
                alt="product image"
                width={200}
                height={200}
              />
              <p>{product.product.name}</p>
              <p className="text-orange-500 font-bold">
                Rp. {product.product.price}
              </p>
              <div className="hidden lg:flex bg-white rounded-md items-center justify-start gap-4">
                <Store className="w-4 h-4" />
                <p className="text-sm font-semibold text-slate-800">
                  {product.store.city}, {product.store.province}
                </p>
              </div>
              <div className="text-sm">Stock: {product.quantity}</div>
              <Button
                className="w-full"
                onClick={() => {
                  router.push(`/products/1/${product.product.id}`);
                }}
              >
                Lihat
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
