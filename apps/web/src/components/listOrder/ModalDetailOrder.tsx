import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';

export const ModalDetailOrder = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="p-2 rounded-sm bg-blue-500 text-white text-base">
          Lihat Detail Transaksi
        </div>
      </DialogTrigger>
      <DialogContent className="lg:w-[1000vh] overflow-auto max-h-[100vh]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col">
              <p className="text-sm">Pesanan</p>
              <p className="text-lg">#INV-20240319-48</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-10 h-full">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <p>Status Pesanan</p>
              <p className="font-semibold">Menunggu Pembayaran</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>tanggal</p>
              <p className="font-semibold">17 Maret 2024</p>
            </div>
            <div className="flex flex-col gap-2">
              <p>Pembayaran</p>
              <p className="font-semibold">Transfer Manual</p>
            </div>
            <div className="flex flex-col gap-2">
              <button className="bg-blue-500 text-white p-2 rounded-sm">
                Cara Pembayaran
              </button>
              <button className="bg-red-500 text-white p-2 rounded-sm">
                Batalkan Pesanan
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex border p-2 justify-center bg-gray-100 rounded-t-md">
              #INV-20240319-48
            </div>
            <div className="flex flex-col border p-6 justify-center rounded-b-md shadow-lg">
              <span className="mb-5">CTC 2-3 hari</span>
              <span>Alamat Pengiriman</span>
              <span className="font-semibold">Label Alamat</span>
              <span>Jhon Doe</span>
              <span className="mb-3">street Alamat</span>
              <span>Pesanan</span>
              <div className="flex justify-between items-center mb-2">
                <div className="flex gap-4 items-center">
                  <Image src="/kamera.jpg" alt="img" width={100} height={100} />
                  <span>Nama product</span>
                </div>
                <span className="text-left">Rp 81.500</span>
              </div>
              <div className="border mb-2 " />
              <div className="flex justify-between">
                <div></div>
                <div className="flex flex-col ">
                  <div className="flex gap-2 justify-between">
                    <span>Total Belanja</span>
                    <span className="font-semibold">Rp 81.500</span>
                  </div>
                  <div className="flex gap-2 justify-between mb-2">
                    <span>Ongkos Kirim</span>
                    <span className="font-semibold">Rp 20.500</span>
                  </div>
                  <div className="border mb-2 " />
                  <div className="flex gap-2 justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">Rp 100.500</span>
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
