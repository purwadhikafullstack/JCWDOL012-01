'use client';

import useProductDetails from "@/hooks/useProductDetails";

type Props = {
  params: {
    storeId: string;
    productId: string;
  };
};

export default function ProductDetailPage({
  params: { storeId, productId },
}: Props) {
  const {data, isError, isLoading, refetch} = useProductDetails({storeId, productId});
  console.log(data)
  
  return (
    <>
      <p>storeId: {storeId}</p>
      <p>productId: {productId}</p>
    </>
  );
}
