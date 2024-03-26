import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { formatToRupiah } from '@/lib/formatToRupiah';
import Image from 'next/image';
import { PaymentGuideModal } from './PaymentGuideModal';

export const ModalDetailOrder = ({ order }: { order: any }) => {
  let totalBelanja = 0;
  order.order_Items.forEach((item: any) => {
    totalBelanja += Number(item.product.price) * item.quantity;
  });

  return (
    <Dialog>
      <DialogTrigger>
        <div className="p-2 rounded-sm bg-blue-500 text-white text-sm">
          Lihat Detail Transaksi
        </div>
      </DialogTrigger>
      <DialogContent className="lg:w-[1000vh] overflow-auto max-h-[90vh] ">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col">
              <p className="text-sm">Pesanan</p>
              <p className="text-lg">{order.payment[0].invoice}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-10 h-full">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="mb-1">Status Pesanan</p>
              <p className="font-semibold">{order.status}</p>
              {order.status === 'pending' && (
                <p className="text-sm">
                  Batas Waktu Pembayaran:{' '}
                  {new Date(order.payment[0].expired_at).toLocaleTimeString()}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p>Tanggal</p>
              <p className="font-semibold">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p>Metode Pembayaran</p>
              <p className="font-semibold">{order.payment[0].method}</p>
            </div>
            {order.status === 'pending' && (
              <div className="flex flex-col gap-1">
                <PaymentGuideModal order={order} />
                <button className="border border-red-500 text-red-500 p-2 rounded-sm">
                  Batalkan Pesanan
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex border p-2 justify-center bg-gray-100 rounded-t-md">
              #{order.payment[0].invoice}
            </div>
            <div className="flex flex-col border p-6 justify-center rounded-b-md shadow-lg">
              <span className="mb-5">CTC, Estimasi pengiriman 2-3 hari</span>
              <span>Alamat Pengiriman</span>
              <span className="font-semibold">
                {order.shipment.address.label}
              </span>
              <span>{order.shipment.address.user.user_name}</span>
              <span className="mb-5">
                {order.shipment.address.street}, {order.shipment.address.city}
              </span>
              <span className="text-base font-semibold">Pesanan</span>
              {order.order_Items.map((item: any, index: any) => (
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
                    {formatToRupiah(Number(item.product.price) * item.quantity)}
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
                      {formatToRupiah(totalBelanja)}
                    </span>
                  </div>
                  <div className="flex gap-2 justify-between mb-2">
                    <span>Ongkos Kirim</span>
                    <span className="font-semibold">
                      {formatToRupiah(Number(order.shipment.amount))}
                    </span>
                  </div>
                  <div className="border mb-2 " />
                  <div className="flex gap-2 justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      {formatToRupiah(Number(order.total))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
