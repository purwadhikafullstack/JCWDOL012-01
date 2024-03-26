import { useQuery } from "@tanstack/react-query";

export default function useCategories() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`,
        { method: 'GET', cache: 'no-cache' },
      );
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