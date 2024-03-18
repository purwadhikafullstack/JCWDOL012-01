import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useDeleteProduct() {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ id }: { id: string; }) => {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_API_URL}/products/${id}`);
      return await res.data;
    }
  });

  return {
    mutate,
    isPending,
    isError
  };
}