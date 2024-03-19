import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { FaLocationDot } from 'react-icons/fa6';

interface ModalAddressNotFoundProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const ModalAddressNotFound: React.FC<ModalAddressNotFoundProps> = ({
  showModal,
  setShowModal,
}) => {
  const router = useRouter();

  const handleButton = () => {
    router.push('/login');
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <div className="flex flex-col justify-center items-center">
          <FaLocationDot className="h-48 w-48 mb-5" />
          <p className="font-semibold text-lg">
            Silahkan buat alamat terlebih dahulu
          </p>
          <DialogClose asChild>
            <button
              onClick={handleButton}
              className="border px-10 py-3 rounded-sm  mb-5 font-bold"
            >
              Buat Alamat
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
