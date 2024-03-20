import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  productId: string;
  storeId: string;
};

export default function useAddProductToStore() {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ productId, storeId }: Props) => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/store/${storeId}/products`, {
        productId, storeId
      });

      return await res.data;
    }
  });

  return {
    mutate,
    isPending,
    isError
  };
}