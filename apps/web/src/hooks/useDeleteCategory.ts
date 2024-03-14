import { useMutation } from "@tanstack/react-query";

export default function useDeleteCategory() {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories/${id}`,
        { method: 'DELETE' },
      );
      return await res.json();
    }
  });

  return {
    mutate, 
    isPending, 
    isError
  };
}