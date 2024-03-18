import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  files: File[];
  name: string;
  price: number;
  weight: number;
  category: string;
  description: string;
};

export default function useCreateProduct() {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ files, name, price, weight, category, description }: Props) => {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('price', String(price));
      formData.append('weight', String(weight));
      formData.append('category', category);
      formData.append('description', description);
      files?.forEach((file: File) => {
        formData.append(`files`, file);
      });

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/products`,
        formData, config);

      return await res.data;
    }
  });

  return {
    mutate,
    isPending,
    isError
  };
}