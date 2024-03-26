import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCheckout } from '@/hooks/useCheckout';
import useTransaction from '@/hooks/useTransaction';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useGetShipment from '@/hooks/useGetShipment';
import LoadingPage from '../LoadingPage';

export const ModalPayment = () => {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState('Transfer_Manual');
  const { mutate } = useTransaction();
  const [isLoading, setIsLoading] = useState(false);
  const {
    orderItems,
    paymentMethod,
    totalPrice,
    voucher,
    shipment,
    selectPaymentMethod,
  } = useCheckout();

  const handlePaymentChange = (event: any) => {
    setSelectedPayment(event.target.value);
    selectPaymentMethod(event.target.value);
  };

  const handlePayment = async () => {
    const data = {
      orderDetails: {
        products: orderItems,
        total: totalPrice,
        voucherId: voucher,
      },
      shipmentDetails: shipment,
      paymentDetails: { method: paymentMethod },
    };
    mutate(data);
    setIsLoading(true);
    router.push('checkout/success');
  };
  return (
    <Dialog>
      <DialogTrigger disabled={isLoading}>
        <div className="py-2 rounded-sm bg-blue-500 text-white font-bold">
          Pilih Pembayaran
        </div>
      </DialogTrigger>
      <DialogContent className="w-1/4">
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
                  selectedPayment === 'Transfer_Manual' ? 'border-blue-500' : ''
                }`}
              >
                <div>Transfer Manual</div>
                <input
                  type="radio"
                  value="Transfer_Manual"
                  checked={selectedPayment === 'Transfer_Manual'}
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
          <button
            disabled={isLoading}
            onClick={handlePayment}
            className="py-2 rounded-sm bg-blue-500 text-white font-bold w-full"
          >
            Bayar Sekarang
          </button>
        </div>
        {isLoading && <LoadingPage />}
      </DialogContent>
    </Dialog>
  );
};
