import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useProducts() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/products`);
      return res?.data;
    }
  });

  return {
    data,
    isLoading,
    isError,
    refetch
  };
}