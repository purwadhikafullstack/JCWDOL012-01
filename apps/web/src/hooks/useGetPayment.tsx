import { CartItem } from '@/utils/cartTypes';
import { Payment } from '@/utils/paymentTypes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

const useGetPayment = () => {
  const cookies = useCookies();
  const token = cookies.get('token');
  const { data, isLoading, isError, refetch } = useQuery<Payment>({
    queryKey: ['payment'],
    queryFn: async () => {
      if (!token) {
        return null;
      }
      try {
        const res = await axios.get('http://localhost:8000/api/payment', {
          headers: { Authorization: `Bearer ${token}` },
        });

        return res.data;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { data, isLoading, isError, refetch };
};

export default useGetPayment;
