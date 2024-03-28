import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import useUpdatePayment from '@/hooks/useUploadPayment';
import { formatToRupiah } from '@/lib/formatToRupiah';
import { toast } from '../ui/use-toast';
import LoadingPage from '../LoadingPage';
import { imageSchema } from '@/lib/validation';

export const PaymentGuideModal = ({ order }: { order: any }) => {
  const [image, setImage] = useState<File | undefined>();
  const { mutate, isPending } = useUpdatePayment();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonProof = async (paymentId: number) => {
    try {
      await imageSchema.validate(image);
      mutate(
        { paymentId, file: image },
        {
          onSuccess: () => {
            toast({
              variant: 'success',
              title: 'Bukti transfer berhasil diupload',
            });
            setIsLoading(true);
            window.location.reload();
          },
          onError: () => {
            toast({
              variant: 'destructive',
              title: 'Pembayaran sudah kadaluarsa!',
            });
          },
        },
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <button
        onClick={() => setIsOpen(true)}
        className="border border-blue-500 text-blue-500 p-2 rounded-sm"
      >
        Petunjuk Pembayaran
      </button>
      <DialogContent className="h-auto">
        <DialogHeader>
          <DialogTitle>Pembayaran</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center">
          <div className="border-2 flex flex-col gap-2 mb-2 w-full p-4 rounded-sm shadow-md">
            <p className="text-base">Batas Waktu Pembayaran</p>
            <p className="text-sm font-semibold">
              {new Date(order.payment[0].expired_at).toLocaleString()}
            </p>
          </div>
          <div className="border-2 flex flex-col gap-4 mb-2 w-full p-4 rounded-sm shadow-md">
            <div className="flex flex-col gap-1">
              <p className="text-base">Metode Pembayaran:</p>
              <p className="text-sm font-semibold">{order.payment[0].method}</p>
            </div>
            <div className="flex flex-col gap-1">
              {order.payment[0].method === 'Virtual_Account' && (
                <>
                  <p className="text-base">Bank</p>
                  <p className="text-sm font-semibold">
                    {order.payment[0].bank}
                  </p>
                  <p className="text-base">Kode Pembayaran</p>
                  <p className="text-sm font-semibold">
                    {order.payment[0].va_number}
                  </p>
                </>
              )}
              {order.payment[0].method === 'Transfer_Manual' && (
                <>
                  <p className="text-base">Transfer ke:</p>
                  <p className="text-sm font-semibold">Mandiri - 1234567890</p>
                  <p className="text-sm font-semibold">BCA - 1234567890</p>
                  <p className="text-sm font-semibold">BRI - 1234567890</p>
                </>
              )}
            </div>
            <div className="flex flex-col gap-1">
              {order.payment[0].method === 'Transfer_Manual' && (
                <div className="flex flex-col gap-1">
                  <label htmlFor="upload">Upload Bukti Pembayaran</label>
                  <input
                    type="file"
                    id="upload"
                    accept="image/*"
                    onChange={(e) =>
                      setImage(e.target.files ? e.target.files[0] : undefined)
                    }
                  />
                </div>
              )}
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-base">Sebesar</p>
              <p className="text-sm font-semibold">
                {formatToRupiah(Number(order.total))}
              </p>
            </div>
          </div>
          {order.payment[0].method === 'Transfer_Manual' && (
            <button
              onClick={() => handleButtonProof(order.payment[0].id)}
              className={`w-full border-2 text-lg p-2 mb-2 font-semibold rounded-sm ${
                image
                  ? 'border-blue-500 text-blue-500'
                  : 'border-gray-500 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!image || isPending}
            >
              Kirim Bukti Transfer
            </button>
          )}
        </div>
        {isLoading && <LoadingPage />}
      </DialogContent>
    </Dialog>
  );
};
