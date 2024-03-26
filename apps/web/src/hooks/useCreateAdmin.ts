import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useSession from "./useSession";

type Props = {
  user_name: string;
  email: string;
  password: string;
};

export default function useCreateAdmin() {
  const { session } = useSession();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ user_name, email, password }: Props) => {
      // if (!session?.token) return null;
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/admin/register`, {
        user_name,
        email,
        password,
        role: 'Store_Admin'
      }, {
        headers: {
          Authorization: `Bearer ${session?.token}`
        }
      });
      return await res.data;
    }
  });

  return {
    mutate,
    isPending,
    isError
  };
}