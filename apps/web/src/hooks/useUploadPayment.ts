import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

type Props = {
  paymentId: number;
  file: File | undefined;
};

const useUpdatePayment = () => {
  const queryClient = useQueryClient();
  const cookies = useCookies();
  const token = cookies.get('token');

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationKey: ['payment'],
    mutationFn: async ({ paymentId, file }: Props) => {
      if (!token) {
        throw new Error('Token is not available');
      }

      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      }

      const res = await axios.patch(
        `http://localhost:8000/api/payment/${paymentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      queryClient.invalidateQueries({ queryKey: ['payment'] });
      return res.data;
    },
  });

  return { mutate, isPending, isError, isSuccess };
};

export default useUpdatePayment;
