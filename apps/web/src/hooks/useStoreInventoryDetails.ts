import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  storeId: string;
  productId: string;
};

export default function useStoreInventoryDetails({ storeId, productId }: Props) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`/store/${storeId}/product/${productId}`],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/store/${storeId}/products/${productId}`);
      return await res.data;
    }
  });

  return {
    data,
    isLoading,
    isError,
    refetch
  };
}