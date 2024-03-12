import { RiCouponLine } from 'react-icons/ri';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useGetVoucher from '@/hooks/useGetVoucher';
import { ListVoucher } from './ListVoucher';
import { Voucher } from '@/utils/voucherTypes';
import { useState } from 'react';
import { DialogClose } from '@radix-ui/react-dialog';

export const ModalVoucher = () => {
  const { data, isLoading, isError } = useGetVoucher();
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [voucher, setVoucher] = useState<Voucher | null>(null);

  const handleVoucherSelect = (voucher: Voucher | null) => {
    setSelectedVoucher(voucher);
  };

  const handleUseVoucher = () => {
    setVoucher(selectedVoucher);
  };

  return (
    <div className="border p-5 flex flex-col gap-1 rounded-md bg-white">
      <span className="text-sm font-bold">Voucher/Kupon</span>
      <Dialog>
        <DialogTrigger className="">
          <div className="border rounded-sm flex items-center gap-1 px-1 ">
            <RiCouponLine />
            <p className="text-gray-400">
              {voucher ? voucher.voucher_code : 'Gunakan Kupon'}
            </p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pilih Voucher</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col mt-2 mb-10">
            {data && data.length > 0 && (
              <div className="flex flex-col gap-5">
                {data.map((voucher) => (
                  <ListVoucher
                    key={voucher.id}
                    voucher={voucher}
                    selectedVoucher={selectedVoucher}
                    handleVoucherSelect={handleVoucherSelect}
                  />
                ))}
              </div>
            )}
          </div>

          <DialogClose
            onClick={handleUseVoucher}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-2 w-[460px]"
          >
            {selectedVoucher ? 'Pakai Voucher' : 'Belanja Tanpa Voucher'}
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};
