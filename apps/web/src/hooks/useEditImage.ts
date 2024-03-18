import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  imageId: string,
  file: File,
};

export default function useEditImage() {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ imageId, file }: Props) => {
      const formData = new FormData();

      if (file) {
        formData.append('file', file);
      }

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      const res = await axios.patch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/products/image/${imageId}`,
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