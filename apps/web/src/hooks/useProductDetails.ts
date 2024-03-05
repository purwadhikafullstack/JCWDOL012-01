import { useQuery } from "@tanstack/react-query";

type Props = {
  storeId: string,
  productId: string,
};

export default function useProductDetails({ storeId, productId }: Props) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`product/${storeId}/${productId}`],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/store/${storeId}/products/${productId}`);
      return await res.json();
    }
  });

  return {
    data,
    isLoading,
    isError,
    refetch
  };
}