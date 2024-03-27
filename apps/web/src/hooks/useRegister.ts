import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type Props = {
  email: string;
  user_name: string;
};

const useRegister = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ email, user_name }: Props) => {
      const data = {
        email: email,
        user_name: user_name,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API}/auth/register`,
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

export default useRegister;
