import { ShippingCostResponse } from '@/utils/shipmentType';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

const useGetShipment = () => {
  const cookies = useCookies();
  const token = cookies.get('token');
  const { data, isLoading, isError, refetch } = useQuery<
    ShippingCostResponse,
    Error
  >({
    queryKey: ['shippingCost'],
    queryFn: async () => {
      if (!token) {
        return null;
      }
      try {
        const res = await axios.get('http://localhost:8000/api/shipment', {
          headers: { Authorization: `Bearer ${token}` },
        });

        return res.data;
      } catch (error) {
        throw new Error('Error get shipping cost');
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { data, isLoading, isError, refetch };
};

export default useGetShipment;
