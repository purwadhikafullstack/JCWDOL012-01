import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

const useDeleteAllCart = () => {
  const queryClient = useQueryClient();
  const cookies = useCookies();
  const token = cookies.get('token');

  const { mutate, isPending } = useMutation({
    mutationKey: ['cart'],
    mutationFn: async () => {
      if (!token) {
        throw new Error('Token is not available');
      }
      try {
        const res = await axios.delete(
          `http://localhost:8000/api/cart/delete`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        queryClient.invalidateQueries({ queryKey: ['cart'] });

        return;
      } catch (error: any) {
        console.error(`error delete cart`, error);
      }
    },
  });

  return { mutate, isPending };
};

export default useDeleteAllCart;
