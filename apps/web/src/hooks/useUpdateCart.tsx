import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const cookies = useCookies();
  const token = cookies.get('token');

  const { mutate, isPending } = useMutation({
    mutationKey: ['cart'],
    mutationFn: async ({
      cartId,
      quantity,
    }: {
      cartId: number;
      quantity: number;
    }) => {
      if (!token) {
        throw new Error('Token is not available');
      }
      try {
        const res = await axios.patch(
          `http://localhost:8000/cart/${cartId}/quantity`,
          {
            quantityChange: quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        queryClient.invalidateQueries({ queryKey: ['cart'] });

        return res.data;
      } catch (error: any) {
        console.error(`error update cart`, error);
      }
    },
  });

  return { mutate, isPending };
};

export default useUpdateCart;
