'use client';

import useStores from '@/hooks/useStores';
import StoreCard from './StoreCard';
import useSession from '@/hooks/useSession';
import useUserByToken from '@/hooks/useUserByToken';

export default function StoreList() {
  const { data, isLoading, isError, refetch } = useStores();

  const { session } = useSession();

  const { data: userData, isLoading: userLoading } = useUserByToken();

  if (isLoading || userLoading) return <div>Loading...</div>;

  let stores;

  if (session?.role == 'Super_Admin') stores = data?.results;
  else if (session?.role == 'Store_Admin')
    stores = userData?.results?.stores.map((store: any) => ({
      ...store,
      user: { email: session?.email },
    }));

  return (
    <div className="flex items-center justify-between gap-8 flex-wrap">
      {stores?.map((store: any, i: number) => {
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
