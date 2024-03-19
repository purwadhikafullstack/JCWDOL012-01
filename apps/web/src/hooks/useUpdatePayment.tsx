import { UserAddress } from '@/utils/addressTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

const useUpdatePayment = () => {
  const queryClient = useQueryClient();
  const cookies = useCookies();
  const token = cookies.get('token');

  const { mutate, isPending } = useMutation({
    mutationKey: ['payment'],
    mutationFn: async (paymentId: number) => {
      if (!token) {
        throw new Error('Token is not available');
      }
      try {
        const res = await axios.patch(
          `http://localhost:8000/api/payment/${paymentId}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        queryClient.invalidateQueries({ queryKey: ['payment'] });
        return res.data;
      } catch (error) {
        console.error(`Error updating payment`, error);
        throw error;
      }
    },
  });

  return { mutate, isPending };
};

export default useUpdatePayment;
