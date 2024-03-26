'use client';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useCookies } from 'next-client-cookies';
import { useRouter } from 'next/navigation';
import { useSession } from '@/provider/SessionProvider';
import useGetCart from '@/hooks/useGetCart';
import { useCart } from '@/provider/CartProvider';

const Login = () => {
  const router = useRouter();
  const cookies = useCookies();
  // const { refetch } = useGetCart();
  const { isUserLoggedIn, setIsUserLoggedIn } = useSession();

  // useEffect(() => {
  //   if (isUserLoggedIn) {
  //     refetch();
  //   }
  // }, [isUserLoggedIn]);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/login',
        {
          email: 'example@mail',
        },
      );
      const { token } = response.data;
      cookies.set('token', token);
      setIsUserLoggedIn(true);
      router.push('/');
      console.log(token);
    } catch (error) {
      console.error('error login', error);
    }
  };

  const handleSignout = () => {
    cookies.remove('token');
    setIsUserLoggedIn(false);
  };
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen">
      <button
        onClick={handleLogin}
        className="bg-red-500 text-white font-bold p-2 text-base"
      >
        LOGIN
      </button>
      <button
        onClick={handleSignout}
        className="bg-red-500 text-white font-bold p-2 text-base"
      >
        Signout
      </button>
    </div>
  );
};

export default Login;
