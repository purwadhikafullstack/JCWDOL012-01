'use client';

import LoadingComponent from '@/components/LoadingComponent';
import { ModalCancelOrder } from '@/components/listOrder/ModalCancelOrder';
import { ModalConfirmOrder } from '@/components/listOrder/ModalConfirmOrder';
import UseGetOrderById from '@/hooks/useGetOrderById';
import { formatToRupiah } from '@/lib/formatToRupiah';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const OrderDetail = ({ orderId }: { orderId: string }) => {
  const { data, isLoading } = UseGetOrderById(Number(orderId));
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  if (isLoading) {
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  }
  return (
    <div className="hidden h-full flex-1 flex-col space-y-2 px-8 md:flex mt-24">
      <div className="flex  items-center justify-between space-y-2">
        <div className="w-full h-auto">
          <h2 className="flex items-center text-2xl font-bold tracking-tight">
            <Link href="/dashboard/orders">
              <ChevronLeft />
            </Link>
            {data.payment[0].invoice}
          </h2>
          <div className="flex flex-col space-y-5 h-full">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <p className="mb-1">Status Pesanan</p>
                <p className="font-semibold">{data.status}</p>
                {data.status === 'pending' && (
                  <p className="text-sm">
                    Batas Waktu Pembayaran:{' '}
                    {new Date(data.payment[0].expired_at).toLocaleTimeString()}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p>Tanggal</p>
                <p className="font-semibold">
                  {new Date(data.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p>Metode Pembayaran</p>
                <p className="font-semibold">{data.payment[0].method}</p>
              </div>

              <div className="flex flex-col gap-2">
                {data.status === 'confirmation' && (
                  <>
                    <Link
                      target="_blank"
                      href={`${data.payment[0].proof_payment}`}
                    >
                      <button className="border border-blue-500 text-blue-500 py-2 w-full rounded-sm">
                        Lihat Bukti Pembayaran
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        setIsConfirmOpen(true);
                      }}
                      className="border border-blue-500 text-blue-500 p-2 rounded-sm"
                    >
                      Konfirmasi Bukti Pembayaran
                    </button>
                  </>
                )}
                {['pending', 'confirmation', 'on_process'].includes(
                  data.status,
                ) && (
                  <button
                    onClick={() => {
                      setIsCancelOpen(true);
                    }}
                    className="border border-red-500 text-red-500 p-2 rounded-sm"
                  >
                    Batalkan Pesanan
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex border p-2 justify-center bg-gray-100 rounded-t-md">
                #{data.payment[0].invoice}
              </div>
              <div className="flex flex-col border p-6 justify-center rounded-b-md shadow-lg mb-10">
                <span className="mb-5">CTC, Estimasi pengiriman 2-3 hari</span>
                <span>Alamat Pengiriman</span>
                <span className="font-semibold">
                  {data.shipment.address.label}
                </span>
                <span>{data.shipment.address.user.user_name}</span>
                <span className="mb-5">
                  {data.shipment.address.street}, {data.shipment.address.city}
                </span>
                <span className="text-base font-semibold">Pesanan</span>
                {data.order_Items.map((item: any, index: any) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    <div className="flex gap-4 items-center">
                      <Image
                        src={item.product.images[0].url}
                        alt={item.product.name}
                        width={100}
                        height={100}
                      />
                      <span>
                        {item.product.name} x {item.quantity}
                      </span>
                    </div>
                    <span className="text-left">
                      {formatToRupiah(
                        Number(item.product.price) * item.quantity,
                      )}
                    </span>
                  </div>
                ))}
                <div className="border mb-2 " />
                <div className="flex justify-between">
                  <div></div>
                  <div className="flex flex-col ">
                    <div className="flex gap-2 justify-between">
                      <span>Total Belanja</span>
                      <span className="font-semibold">
                        {/* {formatToRupiah(totalBelanja)} */}
                      </span>
                    </div>
                    <div className="flex gap-2 justify-between mb-2">
                      <span>Ongkos Kirim</span>
                      <span className="font-semibold">
                        {formatToRupiah(Number(data.shipment.amount))}
                      </span>
                    </div>
                    <div className="border mb-2 " />
                    <div className="flex gap-2 justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold">
                        {formatToRupiah(Number(data.total))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalCancelOrder setCancel={setIsCancelOpen} cancel={isCancelOpen} />
      <ModalConfirmOrder setIsOpen={setIsConfirmOpen} isOpen={isConfirmOpen} />
    </div>
  );
};

export default OrderDetail;
