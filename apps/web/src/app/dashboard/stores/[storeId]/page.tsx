'use client';

import useStoreInventories from '@/hooks/useStoreInventories';

type Props = {
  params: {
    storeId: string;
  };
};

export default function StoreInventoryDashboard({
  params: { storeId },
}: Props) {
  const { data, isLoading, isError, refetch } = useStoreInventories({
    id: storeId,
  });

  if (isLoading) return <div>Loading...</div>;

  console.log(data?.results);

  return <>{storeId}</>;
}
