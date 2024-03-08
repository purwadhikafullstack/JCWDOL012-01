import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { useState } from 'react';

export const ModalPayment = () => {
  const [selectedPayment, setSelectedPayment] = useState('Transfer Manual');

  const handlePaymentChange = (event: any) => {
    setSelectedPayment(event.target.value);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <div className="py-2 rounded-sm bg-blue-500 text-white font-bold">
          Pilih Pembayaran
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pilih Metode Pembayaran</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 items-center">
          <div className="flex p-3 rounded-lg text-blue-700 bg-blue-100 items-center justify-between w-full">
            <p>Total Pembayaran:</p>
            <p className="font-semibold">Rp. 7.900</p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label>
              <div
                className={`flex p-3 rounded-lg border-2 items-center justify-between w-full ${
                  selectedPayment === 'Transfer Manual' ? 'border-blue-500' : ''
                }`}
              >
                <div>Transfer Manual</div>
                <input
                  type="radio"
                  value="Transfer Manual"
                  checked={selectedPayment === 'Transfer Manual'}
                  onChange={handlePaymentChange}
                />
              </div>
            </label>
            <label>
              <div
                className={`flex p-3 rounded-lg border-2 items-center justify-between w-full ${
                  selectedPayment === 'BCA Virtual Account'
                    ? 'border-blue-500'
                    : ''
                }`}
              >
                <div className="flex gap-3 items-center justify-center">
                  <Image src="/BCA.png" alt="BCAIMG" width={50} height={50} />|
                  <div>BCA Virtual Account </div>
                </div>
                <input
                  type="radio"
                  value="BCA Virtual Account"
                  checked={selectedPayment === 'BCA Virtual Account'}
                  onChange={handlePaymentChange}
                />
              </div>
            </label>
            <label>
              <div
                className={`flex p-3 rounded-lg border-2 items-center justify-between w-full ${
                  selectedPayment === 'BRI Virtual Account'
                    ? 'border-blue-500'
                    : ''
                }`}
              >
                <div className="flex gap-3 items-center justify-center">
                  <Image src="/BRI.png" alt="BCAIMG" width={50} height={50} />|
                  <div>BRI Virtual Account </div>
                </div>
                <input
                  type="radio"
                  value="BRI Virtual Account"
                  checked={selectedPayment === 'BRI Virtual Account'}
                  onChange={handlePaymentChange}
                />
              </div>
            </label>
            <label>
              <div
                className={`flex p-3 rounded-lg border-2 items-center justify-between w-full ${
                  selectedPayment === 'Mandiri Virtual Account'
                    ? 'border-blue-500'
                    : ''
                }`}
              >
                <div className="flex gap-3 items-center justify-center">
                  <Image
                    src="/Mandiri.png"
                    alt="BCAIMG"
                    width={50}
                    height={50}
                  />
                  |<div>Mandiri Virtual Account </div>
                </div>
                <input
                  type="radio"
                  value="Mandiri Virtual Account"
                  checked={selectedPayment === 'Mandiri Virtual Account'}
                  onChange={handlePaymentChange}
                />
              </div>
            </label>
          </div>
          <button className="py-2 rounded-sm bg-blue-500 text-white font-bold w-full">
            Bayar Sekarang
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
