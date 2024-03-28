import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

const UseGetOrderById = (orderId: number) => {
  const cookies = useCookies();
  const token = cookies.get('token');
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['order'],
    queryFn: async () => {
      if (!token) {
        return null;
      }
      const res = await axios.get(
        `http://localhost:8000/api/order/${orderId}`,
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

export default UseGetOrderById;
