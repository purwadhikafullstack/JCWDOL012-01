import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';
import { useState } from 'react';

const useCreateCart = () => {
  const queryClient = useQueryClient();
  const cookies = useCookies();
  const token = cookies.get('token');
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate, isPending } = useMutation({
    mutationKey: ['cart'],
    mutationFn: async ({
      productId,
      storeId,
      quantity,
    }: {
      productId: string;
      storeId: string;
      quantity: number;
    }) => {
      if (!token) {
        throw new Error();
      }
      const res = await axios.post(
        `http://localhost:8000/api/cart/create`,
        {
          quantity,
          product_id: productId,
          store_id: storeId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      return res.data;
    },
  });

  return { mutate, isPending, errorMessage };
};

export default useCreateCart;
