import { DialogContent, DialogClose } from '@/components/ui/dialog';
import { FaUserAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export const AuthModal = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };
  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <DialogContent>
      <div className="flex flex-col justify-center items-center">
        <FaUserAlt className="h-48 w-48 mb-5" />
        <p className="font-semibold text-lg">Sudah Punya Akun?</p>
        <p className="text-base mb-5">
          Masuk ke akunmu atau daftar terlebih dahulu
        </p>
        <DialogClose asChild>
          <button
            onClick={handleLogin}
            className="border px-10 py-3 rounded-sm  mb-5 font-bold"
          >
            Login
          </button>
        </DialogClose>
        <DialogClose asChild>
          <button
            onClick={handleRegister}
            className="border px-8 py-3 rounded-sm font-bold"
          >
            Register
          </button>
        </DialogClose>
      </div>
    </DialogContent>
  );
};
