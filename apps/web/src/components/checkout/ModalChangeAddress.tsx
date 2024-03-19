import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

interface ModalAddressNotFoundProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  onReturnStep: () => void;
}

export const ModalChangeAddress: React.FC<ModalAddressNotFoundProps> = ({
  showModal,
  setShowModal,
  onReturnStep,
}) => {
  const router = useRouter();

  const handleButton = () => {
    setShowModal(false);
    onReturnStep();
  };

  const handleButtonCancel = () => {
    setShowModal(false);
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogHeader>
        <DialogTitle>Yakin ingin ganti alamat?</DialogTitle>
      </DialogHeader>
      <DialogContent className="w-[600px]">
        <div className="flex flex-col justify-center items-center space-y-5">
          <p className="text-lg text-center flex">
            Stok produk yang sudah kamu pilih dari wilayah sebelumnya akan
            disesuaikan dengan stok di wilayah penggantinya, ya!
          </p>
          <DialogClose asChild>
            <div className="flex gap-5">
              <button
                onClick={handleButton}
                className="border px-10 py-3 rounded-sm  mb-5 font-bold"
              >
                Ganti Alamat
              </button>
              <button
                onClick={handleButtonCancel}
                className="border px-10 py-3 rounded-sm  mb-5 font-bold"
              >
                Batal
              </button>
            </div>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
