'use client';

import { NavbarPayment } from '@/components/checkout/NavbarPayment';
import useGetPayment from '@/hooks/useGetPayment';
import useUpdatePayment from '@/hooks/useUpdatePayment';
import { formatExpirationDate } from '@/lib/formatExpirationDate';
import { formatToRupiah } from '@/lib/formatToRupiah';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GiSandsOfTime } from 'react-icons/gi';

const Success = () => {
  const router = useRouter();
  const [image, setImage] = useState<File | undefined>();
  const { data: dataPayment, isLoading, isError } = useGetPayment();
  const { mutate: updatePayment, isPending } = useUpdatePayment();

  useEffect(() => {
    if (dataPayment) {
      router.replace(`/checkout/success?invoice=${dataPayment?.invoice}`);
    }
  }, [dataPayment]);

  const handleButtonProof = async (paymentId: number) => {
    try {
      await updatePayment(paymentId);
      router.push('/customer/order');
    } catch (error) {
      router.push('/');
    }
  };
  if (!dataPayment) return null;
  return (
    <>
      <NavbarPayment />
      <div className=" flex items-center justify-center bg-white mt-7">
        <div className="flex flex-col items-center justify-center w-5/6 md:w-2/3  lg:w-1/4">
          <GiSandsOfTime className="mb-2 w-36 h-36" />
          <p className="font-semibold text-lg mb-2">Menunggu pembayaran</p>
          <p className="text-sm mb-2 text-center">
            Silahkan lakukan pembayaran untuk pesananmu sesuai keterangan di
            bawah ini
          </p>
          <div className="border-2 flex flex-col gap-2 mb-2 w-full p-4 rounded-sm shadow-md">
            <p className="text-base">Batas Waktu Pembayaran</p>
            <p className="text-sm font-semibold">
              {formatExpirationDate(dataPayment.expired_at)}
            </p>
          </div>
          <div className="border-2 flex flex-col gap-4 mb-2 w-full p-4 rounded-sm shadow-md">
            <div className="flex flex-col gap-1">
              <p className="text-base">Metode Pembayaran</p>
              <p className="text-sm font-semibold">{dataPayment.method}</p>
            </div>
            <div className="flex flex-col gap-1">
              {dataPayment.method === 'va_mandiri' ||
                dataPayment.method === 'va_bca' ||
                (dataPayment.method === 'va_bri' && (
                  <>
                    <p className="text-base">Kode Pembayaran</p>
                    <p className="text-sm font-semibold">1234567890</p>
                  </>
                ))}
              {dataPayment.method === 'Manual_Transfer' && (
                <>
                  <p className="text-base">Transfer ke</p>
                  <p className="text-sm font-semibold">Mandiri - 1234567890</p>
                  <p className="text-sm font-semibold">BCA - 1234567890</p>
                  <p className="text-sm font-semibold">BRI - 1234567890</p>
                </>
              )}
            </div>
            {dataPayment.method === 'Manual_Transfer' && (
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
            <div className="flex flex-col gap-1">
              <p className="text-base">Sebesar</p>
              <p className="text-sm font-semibold">
                {formatToRupiah(Number(dataPayment.total))}
              </p>
            </div>
          </div>
          {image && (
            <button
              onClick={() => handleButtonProof(dataPayment.id)}
              className="w-full border-2 border-blue-500 text-blue-500 rounded-sm text-lg p-2 mb-2 font-semibold"
            >
              Kirim Bukti Transfer
            </button>
          )}
          <button className="w-full border-2 border-blue-500 text-blue-500 rounded-sm text-lg p-2 mb-2 font-semibold">
            Cara Pembayaran
          </button>
          <button
            onClick={() => router.push('/customer/order')}
            className="w-full border-2 border-blue-500 text-blue-500 rounded-sm text-lg p-2 mb-8 font-semibold"
          >
            Lihat Detail Pesanan
          </button>
        </div>
      </div>
    </>
  );
};

export default Success;
