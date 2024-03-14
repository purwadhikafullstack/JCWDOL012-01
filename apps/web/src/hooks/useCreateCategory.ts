import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useCreateCategory() {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ name }: { name: string; }) => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`,
        { name });

      return res?.data;
    }
  });

  return {
    mutate,
    isPending,
    isError,
  };
}