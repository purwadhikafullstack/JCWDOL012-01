import { DialogContent, DialogClose } from '@/components/ui/dialog';
import { FaUserAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { Dialog } from '@radix-ui/react-dialog';

export const ModalCancelOrder = ({
  setCancel,
  cancel,
}: {
  setCancel: Dispatch<SetStateAction<boolean>>;
  cancel: boolean;
}) => {
  const router = useRouter();

  const handleConfirm = () => {};

  return (
    <Dialog open={cancel} onOpenChange={setCancel}>
      <DialogContent>
        <div className="flex flex-col p-5 justify-center items-center">
          <p className="font-semibold text-lg mb-5 ">
            Anda yakin mau batalkan orderan ini?
          </p>
          <DialogClose asChild>
            <div className="flex gap-5">
              <button
                onClick={handleConfirm}
                className="border px-10 py-3 rounded-sm font-bold"
              >
                Yakin
              </button>
              <button
                onClick={() => {
                  setCancel(false);
                }}
                className="border px-10 py-3 rounded-sm font-bold"
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
