import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useSession from "./useSession";

export default function useUsers() {
  const { session } = useSession();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`/all-users/${session?.token}`],
    queryFn: async () => {
      if (!session?.token) return null;
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${session?.token}`
        }
      });
      return await res.data;
    },
  });

  return {
    data,
    isLoading,
    isError,
    refetch
  };
}