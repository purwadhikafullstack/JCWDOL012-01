import Image from 'next/image';
import { RiDeleteBinLine } from 'react-icons/ri';

export const CartListProduct = () => {
  return (
    <div className="flex w-full max-h-28 min-h-28">
      <div className="flex w-1/4 pr-2 pt-0 pl-0">
        <Image src="/kamera.jpg" alt="imgproduct" height={100} width={100} />
      </div>
      <div className="flex flex-col w-2/4 gap-2 justify-between ">
        <div className="flex h-10">
          <p className="text-sm font-semibold">
            Wall'S,Ice Cream Magnum Matcha Crumble 80ml Pck
          </p>
        </div>
        <div>Rp.10.000</div>
        <div className="flex">
          <button className="w-6 h-6 rounded-sm border border-gray-400 flex items-center justify-center">
            +
          </button>
          <span className="border-b px-5">2</span>
          <button className="w-6 h-6 rounded-sm border border-gray-400 flex items-center justify-center">
            -
          </button>
        </div>
      </div>
      <div className="flex flex-col w-1/4 items-end justify-between">
        <div>
          <RiDeleteBinLine className="h-6 w-6 cursor-pointer" />
        </div>
        <div className="font-semibold">
          <p>Rp.20.000</p>
        </div>
      </div>
    </div>
  );
};
