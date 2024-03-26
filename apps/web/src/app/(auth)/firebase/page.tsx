'use client';
import { auth } from '@/config/firebase';
import { useUser } from '@/provider/UserProvider';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { setUser } = useUser();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    signIn(provider);
  };

  const signIn = async (provider: any) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
          onClick={handleGoogleSignIn}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
