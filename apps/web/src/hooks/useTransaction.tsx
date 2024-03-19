import { CreateCartData } from '@/utils/cartTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { error } from 'console';
import { useCookies } from 'next-client-cookies';
import { useState } from 'react';

const useTransaction = () => {
  const queryClient = useQueryClient();
  const cookies = useCookies();
  const token = cookies.get('token');
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate, isPending } = useMutation({
    mutationKey: ['transaction'],
    mutationFn: async ({
      orderDetails,
      paymentDetails,
      shipmentDetails,
    }: {
      orderDetails: {
        products: Array<{
          createdAt: string;
          id: number;
          image: string;
          name: string;
          price: string;
          product_id: number;
          quantity: number;
          updatedAt: string;
          user_id: number;
        }>;
        total: number;
        voucherId: string | null;
      };
      paymentDetails: { method: string };
      shipmentDetails: {
        address_id: number;
        amount: number;
        type: string;
        store_id: number;
      };
    }) => {
      if (!token) {
        throw new Error();
      }
      try {
        const res = await axios.post(
          `http://localhost:8000/api/transaction/create`,
          {
            orderDetails,
            paymentDetails,
            shipmentDetails,
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

export default useTransaction;
