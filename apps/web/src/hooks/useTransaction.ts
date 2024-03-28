import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

const useTransaction = () => {
  const queryClient = useQueryClient();
  const cookies = useCookies();
  const token = cookies.get('token');

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
      paymentDetails: {
        method: string;
        bank: string;
      };
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
      } catch (error) {
        console.error(`Error create transaction`, error);
      }
    },
  });

  return { mutate, isPending };
};

export default useTransaction;
