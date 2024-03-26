import { useCart } from '@/provider/CartProvider';
import { Voucher } from '@/utils/voucherTypes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

const useGetVoucher = () => {
  const cookies = useCookies();
  const token = cookies.get('token');
  const { data, isLoading, isError, refetch } = useQuery<Voucher[]>({
    queryKey: ['voucher'],
    queryFn: async () => {
      if (!token) {
        return null;
      }
      try {
        const res = await axios.get('http://localhost:8000/api/voucher', {
          headers: { Authorization: `Bearer ${token}` },
        });

        return res.data;
      } catch (error: any) {
        console.error('Error fetching voucher:', error);
        throw new Error('Failed to fetch voucher');
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { data, isLoading, isError, refetch };
};

export default useGetVoucher;
