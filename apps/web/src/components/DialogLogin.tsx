'use client';
import { useDialog } from '@/hooks/useDialog';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import useGetCart from '@/hooks/useGetCart';
import axios from 'axios';
import { useEffect } from 'react';
import { useLogin } from '@/provider/SessionProvider';
import { useCookies } from 'next-client-cookies';

export default function DialogLogin() {
  const { isOpenLogin, onCloseLogin } = useDialog();
  const { onOpenRegister } = useDialog();
  const cookies = useCookies();
  const { refetch } = useGetCart();
  const { isUserLoggedIn, setIsUserLoggedIn } = useLogin();

  useEffect(() => {
    if (isUserLoggedIn) {
      refetch();
    }
  }, [isUserLoggedIn, refetch]);

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
      onCloseLogin();
    } catch (error) {
      console.error('error login', error);
    }
  };

  return (
    <>
      <Dialog
        onOpenChange={onCloseLogin}
        open={isOpenLogin}
        modal
        defaultOpen={isOpenLogin}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex justify-center">Login</DialogTitle>
            <DialogDescription className="flex justify-center">
              Belum punya akun ?
              <span
                onClick={onOpenRegister}
                className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                title="Sign In"
              >
                Daftar
              </span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Email
              </Label>
              <Input id="name" placeholder="Email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Password"
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <DialogFooter>
              <Button
                onClick={handleLogin}
                className="bg-blue-500 px-24"
                type="submit"
              >
                Masuk
              </Button>
            </DialogFooter>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-full h-[1px] bg-gray-300"></div>
            <span className="text-sm uppercase mx-6 text-gray-400">Or</span>
            <div className="w-full h-[1px] bg-gray-300"></div>
          </div>

          <div className="flex justify-center text-sm">
            <button className="flex items-center justify-center space-x-2 text-gray-600 px-10 my-2 py-2 bg-gray-200 hover:bg-gray-200 rounded">
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 326667 333333"
              >
                {/* logo Google */}
                <path
                  d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
                  fill="#4285f4"
                ></path>
                <path
                  d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
                  fill="#34a853"
                ></path>
                <path
                  d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
                  fill="#fbbc04"
                ></path>
                <path
                  d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
                  fill="#ea4335"
                ></path>
              </svg>
              <span>Sign up with Google</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
