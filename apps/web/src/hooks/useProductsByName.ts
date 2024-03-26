import { useQuery } from "@tanstack/react-query";

type Props = {
  search?: string,
  storeId?: Number;
  page?: Number;
};

export default function useProductsByName({ search, storeId, page }: Props) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [`products/${search}`],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/store/${storeId || 1}/products?search=${search || ''}&page=${page || 1}`);
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