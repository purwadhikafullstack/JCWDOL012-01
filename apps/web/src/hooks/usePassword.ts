import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type Props = {
  password: string;
  confirmPassword: string;
};

const usePassword = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ password, confirmPassword }: Props) => {
      const data = {
        password: password,
        confirmPassword: confirmPassword,
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API}/auth/create-password`,
        data,
        config,
      );
      return res.data;
    },
  });

  return {
    mutate,
    isPending,
    isError,
  };
};

export default usePassword;
