import React, { useEffect, useState } from 'react';
import { SelectShipment } from './SelectShipment';
import { ShipmentListProduct } from './ShipmentListProduct';
import { CheckoutTotalShipment } from './CheckoutTotalShipment';
import useGetAddress from '@/hooks/useGetAddress';
import { UserAddress } from '@/utils/addressTypes';
import useGetUser from '@/hooks/useGetUser';
import useGetCart from '@/hooks/useGetCart';
import useGetShipment from '@/hooks/useGetShipment';
import { useCheckout } from '@/hooks/useCheckout';

export const CheckoutShipment = () => {
  const { data: shipmentCost } = useGetShipment();
  const { data, isLoading, isError } = useGetAddress();
  const { data: dataCart } = useGetCart();
  const { data: dataUser } = useGetUser();
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

  return (
    <div>
      <div className="bg-gray-100">
        <div className="wrapper flex w-full gap-20 justify-center">
          <div className="flex flex-col w-full lg:w-3/4 space-y-5">
            <div className="bg-blue-100 pt-2 pb-5 px-5 text-black flex flex-col items-center gap-1 rounded-lg">
              <div className="flex justify-between w-full text-xs">
                <p className="">Kirim ke:</p>
                <button className=" font-bold text-blue-500">
                  Ganti Alamat {'>'}
                </button>
              </div>
              <div className="flex flex-col justify-between bg-white border rounded-sm w-full p-3 gap-3">
                <div className="font-bold text-base">
                  {selectedAddress?.label}
                </div>
                <div className="text-sm">
                  {dataUser?.user_name} ({dataUser?.telephone})
                </div>
                <div className="text-sm">
                  {selectedAddress?.street} , {selectedAddress?.city}{' '}
                  {selectedAddress?.province}
                </div>
              </div>
            </div>
            <div className="flex flex-col bg-white p-5 rounded-sm gap-3">
              <p className="font-bold text-base">Metode Pengiriman</p>
              <SelectShipment
                shipmentOptions={shipmentCost?.shippingCost[0] ?? []}
                addressId={shipmentCost?.addressId ?? 0}
                storeId={shipmentCost?.storeId ?? 0}
              />
              <div className="flex justify-between">
                <p className="font-bold text-base">Pesanan</p>
                <p className="flex text-gray-400 text-base gap-1">
                  {dataCart?.reduce(
                    (total, item) => total + item.quantity,
                    0,
                  ) ?? 0}
                  <span>Qty</span>
                </p>
              </div>
              <div className="flex flex-col mt-5 mb-5">
                {dataCart && dataCart.length > 0 && (
                  <div className="flex flex-col gap-7">
                    {dataCart.map((item) => (
                      <ShipmentListProduct key={item.id} cartItem={item} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="hidden lg:flex lg:flex-col space-y-5 w-1/4 sticky top-1 h-screen">
            <CheckoutTotalShipment />
          </div>
        </div>
      </div>
    </div>
  );
};
