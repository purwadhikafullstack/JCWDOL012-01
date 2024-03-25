'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import useAdminSignIn from '@/hooks/useAdminSignIn';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import useSession from '@/hooks/useSession';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isPending } = useAdminSignIn();
  const { setSessionCookie } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignIn = () => {
    mutate(
      { email, password },
      {
        onSuccess: (data) => {
          toast({
            variant: 'success',
            title: 'Sign In Successfully !',
            description: 'Redirect to Dashboard',
          });

          setSessionCookie({
            id: data.id,
            user_name: data.user_name,
            email: data.email,
            role: data.role,
            token: data.token,
          });

          router.push('/dashboard');
          router.refresh();
        },
        onError: (res: any) => {
          toast({
            variant: 'destructive',
            title: 'Sign In Failed !',
            description: res?.response?.data?.message,
          });
        },
      },
    );
  };

  return (
    <div className="mx-auto space-y-4 mt-8 py-8 shadow-md rounded-md flex flex-col items-center justify-center w-[500px] bg-white tracking-wider">
      <div className="font-medium text-3xl">Admin Sign-In</div>
      <div className="w-8/12">
        <div className="text-gray-600">Email</div>
        <Input
          className="border-gray-400"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-8/12">
        <div className="text-gray-600">Password</div>
        <Input
          type="password"
          className="border-gray-400"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button onClick={handleSignIn} disabled={isPending}>
        Sign In !
      </Button>
    </div>
  );
}
