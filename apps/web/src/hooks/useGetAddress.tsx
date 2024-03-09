import { UserAddress } from '@/utils/addressTypes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

const useGetAddress = () => {
  const cookies = useCookies();
  const token = cookies.get('token');
  const { data, isLoading, isError, refetch } = useQuery<UserAddress[]>({
    queryKey: ['address'],
    queryFn: async () => {
      if (!token) {
        return null;
      }
      try {
        const res = await axios.get('http://localhost:8000/api/address', {
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

export default useGetAddress;
