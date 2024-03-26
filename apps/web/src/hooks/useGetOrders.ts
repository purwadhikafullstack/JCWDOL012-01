import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

const UseGetOrders = (filterParams: any) => {
  const cookies = useCookies();
  const token = cookies.get('token');
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['order', filterParams],
    queryFn: async () => {
      if (!token) {
        return null;
      }

      const queryString = new URLSearchParams(filterParams).toString();

      const res = await axios.get(
        `http://localhost:8000/api/order?${queryString}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      return res.data;
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { data, isLoading, isError, refetch };
};

export default UseGetOrders;
