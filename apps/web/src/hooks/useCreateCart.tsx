import { CreateCartData } from '@/utils/cartTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { error } from 'console';
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
      try {
        const res = await axios.post(
          `http://localhost:8000/cart/create`,
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
      } catch (error: any) {
        console.error(error);
        const errorMessageFromAPI = error.response?.data?.error;
        if (errorMessageFromAPI === 'Stok kosong') {
          setErrorMessage('Stok Barang Tidak Tersedia');
        } else if (errorMessageFromAPI === 'Stok tidak mencukupi') {
          setErrorMessage('Stok Barang Tidak Mencukupi');
        } else {
          setErrorMessage('terjadi kesalahan');
        }
      }
    },
  });

  return { mutate, isPending, errorMessage };
};

export default useCreateCart;
