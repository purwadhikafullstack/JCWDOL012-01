'use client';
import { IoTimeOutline } from 'react-icons/io5';
import { FiPackage } from 'react-icons/fi';
import { MdOutlineLocalShipping, MdOutlineCancel } from 'react-icons/md';
import { FaRegCheckCircle } from 'react-icons/fa';
import Image from 'next/image';
import { formatToRupiah } from '@/lib/formatToRupiah';
import { ModalDetailOrder } from './ModalDetailOrder';
import LoadingComponent from '../LoadingComponent';

interface Props {
  order: any;
}

export const DetailOrder: React.FC<Props> = ({ order }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex rounded-xl border overflow-hidden">
        <div
          className={`flex items-center px-2 justify-center ${
            order.status === 'pending'
              ? 'bg-orange-300'
              : order.status === 'confirmation'
                ? 'bg-orange-300'
                : order.status === 'on_process'
                  ? 'bg-green-300'
                  : order.status === 'shipped'
                    ? 'bg-green-300'
                    : order.status === 'confirmed'
                      ? 'bg-green-300'
                      : order.status === 'cancelled'
                        ? 'bg-red-300'
                        : ''
          }`}
        >
          {order.status === 'pending' && (
            <IoTimeOutline className="w-10 h-10" />
          )}
          {order.status === 'confirmation' && (
            <IoTimeOutline className="w-10 h-10" />
          )}
          {order.status === 'on_process' && <FiPackage className="w-10 h-10" />}
          {order.status === 'shipped' && (
            <MdOutlineLocalShipping className="w-10 h-10" />
          )}
          {order.status === 'confirmed' && (
            <FaRegCheckCircle className="w-10 h-10" />
          )}
          {order.status === 'cancelled' && (
            <MdOutlineCancel className="w-10 h-10" />
          )}
        </div>
        <div className="flex flex-col px-4 py-5 gap-1 items-start w-2/3">
          <p>Pesanan {order.payment[0].invoice}</p>
          <p>{new Date(order.createdAt).toLocaleString()}</p>
          <div className={order.order_Items.length > 1 ? 'flex gap-1' : ''}>
            {order.order_Items.map((item: any, index: any) => (
              <div
                key={index}
                className="flex gap-1 items-center justify-center"
              >
                <Image
                  src={item.product.images[0].url}
                  alt={item.product.name}
                  width={100}
                  height={100}
                />
                {order.order_Items.length === 1 && <p>{item.product.name}</p>}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col px-4 py-5 items-end w-1/3">
          <p className="text-lg">Subtotal Pembayaran</p>
          <p className="text-2xl text-orange-400 mb-5">
            {formatToRupiah(Number(order.total))}
          </p>
          <ModalDetailOrder order={order} />
        </div>
      </div>
    </div>
  );
};
