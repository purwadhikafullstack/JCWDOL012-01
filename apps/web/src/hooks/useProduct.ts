import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useProduct({ id }: { id: string; }) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`/product/${id}`],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/products/${id}`);
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