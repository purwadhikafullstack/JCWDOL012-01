'use client';

import useStores from '@/hooks/useStores';
import StoreCard from './StoreCard';

export default function StoreList() {
  const { data, isLoading, isError, refetch } = useStores();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-between gap-8 flex-wrap">
      {data?.results?.map((store: any, i: number) => {
        const totalInventory = store?.product_inventories?.length;
        const admin = store?.user?.email;
        return (
          <div key={i} className="w-[30%]">
            <StoreCard
              id={store?.id}
              admin={admin}
              street={store?.street}
              city={store?.city}
              province={store?.province}
              totalInventory={totalInventory}
            />
          </div>
        );
      })}
    </div>
  );
}
