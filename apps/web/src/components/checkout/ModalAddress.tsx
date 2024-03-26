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
import { ListAddress } from './ListAddress';
import { UserAddress } from '@/utils/addressTypes';
import useUpdateAddress from '@/hooks/useUpdateAddress';
import useGetAddress from '@/hooks/useGetAddress';

export const ModalAddress = () => {
  const { data: dataAddress, isLoading, isError } = useGetAddress();
  const { mutate: updatePrimaryAddress, isPending } = useUpdateAddress();
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(
    null,
  );

  useEffect(() => {
    if (!isLoading && !isError && dataAddress) {
      const primaryAddresses = dataAddress.filter(
        (address) => address.isPrimary,
      );
      if (primaryAddresses.length > 0) {
        setSelectedAddress(primaryAddresses[0]);
      }
    }
  }, [dataAddress, isError, isLoading]);

  const handleAddressSelect = (address: UserAddress) => {
    setSelectedAddress(address);
    updatePrimaryAddress(address.id);
  };

  if (!dataAddress) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="lg:border px-5 py-2 text-black flex justify-between items-center rounded-xl lg:rounded-md bg-white">
          <div className="flex items-center gap-1">
            <FaLocationDot className="h-3 w-3" />
            <span className="text-[13px]">
              Dikirim ke: {selectedAddress?.label},{selectedAddress?.city}
            </span>
          </div>
          <FaAngleDown className="h-4 w-4" />
        </div>
      </DialogTrigger>
      <DialogContent className=" w-[75vh] lg:w-[80vh]">
        <DialogHeader>
          <DialogTitle>Pilih alamat pengiriman</DialogTitle>
        </DialogHeader>
        <DialogClose>
          <div className="flex flex-col mt-5 mb-5">
            {dataAddress && dataAddress.length > 0 && (
              <div className="flex flex-col gap-7">
                {dataAddress.map((address) => (
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
