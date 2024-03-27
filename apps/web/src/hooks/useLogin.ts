import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type Props = {
  email: string;
  password: string;
};

const useLogin = () => {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ email, password }: Props) => {
      const data = {
        email: email,
        password: password,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
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

export default useLogin;
