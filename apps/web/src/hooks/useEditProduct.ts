import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  id: string;
  name: string;
  price: number;
  weight: number;
  category: string;
  description: string;
};

export default function useEditProduct() {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ id, name, price, weight, category, description }: Props) => {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_API_URL}/products/${id}`, {
        name, price, weight, category, description
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