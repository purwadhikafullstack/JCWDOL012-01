import { useMutation } from "@tanstack/react-query";

type Props = {
  id: number;
  categoryName: string;
};

export default function useEditCategory() {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ id, categoryName }: Props) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/categories/${id}`, {
        method: 'PATCH',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName }),
      });

      return await res.json();
    }
  });

  return {
    mutate,
    isPending,
    isError,
  };
}