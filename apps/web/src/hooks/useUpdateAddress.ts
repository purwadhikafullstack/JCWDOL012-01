import { UserAddress } from '@/utils/addressTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  const cookies = useCookies();
  const token = cookies.get('token');

  const { mutate, isPending } = useMutation({
    mutationKey: ['address'],
    mutationFn: async (addressId: number) => {
      if (!token) {
        throw new Error('Token is not available');
      }
      try {
        const res = await axios.patch(
          `http://localhost:8000/api/address/${addressId}/isPrimary`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        queryClient.invalidateQueries({ queryKey: ['address'] });
        return res.data;
      } catch (error) {
        console.error(`Error updating address`, error);
        throw error; // Melempar kembali error untuk menangani di komponen yang menggunakan hook ini
      }
    },
  });

  return { mutate, isPending };
};

export default useUpdateAddress;
