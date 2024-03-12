import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FaLocationDot } from 'react-icons/fa6';
import { FaAngleDown } from 'react-icons/fa6';
import useGetAddress from '@/hooks/useGetAddress';
import { ListAddress } from './ListAddress';
import { UserAddress } from '@/utils/addressTypes';
import useUpdateAddress from '@/hooks/useUpdateAddress';

export const CheckoutAddress = () => {
  const { data, isLoading, isError } = useGetAddress();
  const { mutate: updatePrimaryAddress, isPending } = useUpdateAddress();
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(
    null,
  );

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const primaryAddresses = data.filter((address) => address.isPrimary);
      if (primaryAddresses.length > 0) {
        setSelectedAddress(primaryAddresses[0]);
      }
    }
  }, [data]);

  const handleAddressSelect = (address: UserAddress) => {
    setSelectedAddress(address);
    updatePrimaryAddress(address.id);
  };

  return (
    <Dialog>
      <DialogTrigger className="">
        <div className="border px-5 py-1 text-black flex justify-between items-center rounded-md bg-white">
          <div className="flex gap-1">
            <FaLocationDot className="h-4 w-4" />
            <span className="text-sm">
              Dikirim ke: {selectedAddress?.label},{selectedAddress?.city}
            </span>
          </div>
          <FaAngleDown className="h-4 w-4" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pilih alamat pengiriman</DialogTitle>
        </DialogHeader>
        <DialogClose>
          <div className="flex flex-col mt-5 mb-5">
            {data && data.length > 0 && (
              <div className="flex flex-col gap-7">
                {data.map((address) => (
                  <ListAddress
                    key={address.id}
                    userAddress={address}
                    selectedAddress={selectedAddress}
                    handleAddressSelect={handleAddressSelect}
                  />
                ))}
              </div>
            )}
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
