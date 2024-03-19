import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type Props = {
  storeId: string;
  productId: string;
  qty: number;
};

export default function useReduceStock() {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ storeId, productId, qty }: Props) => {
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/store/${storeId}/products/${productId}/reduce-stock`,
        {
          qty,
        },
      );

      return await res.data;
    },
  });

  return {
    mutate,
    isPending,
    isError,
  };
}
