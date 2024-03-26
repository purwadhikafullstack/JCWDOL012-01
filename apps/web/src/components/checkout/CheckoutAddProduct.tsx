import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export const CheckoutAddProduct = () => {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => router.push('/')}
        className="hidden lg:flex items-center p-2 border rounded-sm space-x-1"
      >
        <FaPlus className="h-4 w-4" />
        <span>Tambah Pesanan Lagi</span>
      </button>
      <p
        onClick={() => router.push('/')}
        className="flex sm:hidden items-center cursor-pointer"
      >
        <FaPlus className="h-4 w-4" />
        <span>Tambah Pesanan Lagi</span>
      </p>
    </div>
  );
};
