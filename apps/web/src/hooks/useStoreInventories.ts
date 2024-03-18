import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useStoreInventories({ id }: { id: string; }) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`/store/${id}/inventories`],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/store/${id}/products`);
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