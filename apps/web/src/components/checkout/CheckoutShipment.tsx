import React, { useEffect, useState } from 'react';
import { SelectShipment } from './SelectShipment';
import { ShipmentListProduct } from './ShipmentListProduct';
import { CheckoutTotalShipment } from './CheckoutTotalShipment';
import useGetAddress from '@/hooks/useGetAddress';
import { UserAddress } from '@/utils/addressTypes';
import useGetUser from '@/hooks/useGetUser';
import useGetShipment from '@/hooks/useGetShipment';
import { ModalChangeAddress } from './ModalChangeAddress';
import { useCart } from '@/provider/CartProvider';
import LoadingComponent from '../LoadingComponent';

interface CheckoutShipmentProps {
  onReturnStep: () => void;
}

export const CheckoutShipment: React.FC<CheckoutShipmentProps> = ({
  onReturnStep,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { data: dataShipment, isLoading: loadingShipment } = useGetShipment();
  const { data: dataAddress, isLoading: loadingAddress } = useGetAddress();
  const { cart: dataCart } = useCart();
  const { data: dataUser } = useGetUser();
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(
    null,
  );

  useEffect(() => {
    if (!loadingAddress && dataAddress) {
      const primaryAddresses = dataAddress.filter(
        (address) => address.isPrimary,
      );
      if (primaryAddresses.length > 0) {
        setSelectedAddress(primaryAddresses[0]);
      }
    }
  }, [dataAddress, loadingAddress]);

  return (
    <div>
      <div className="">
        <div className="wrapper flex w-full gap-10 h-auto">
          <div className="flex flex-col w-full lg:w-3/4 space-y-5">
            <div className="bg-blue-100 pt-2 pb-5 px-5 text-black flex flex-col items-center gap-1 rounded-lg">
              <div className="flex justify-between w-full text-xs">
                <p className="">Kirim ke:</p>
                <button
                  onClick={() => setShowModal(true)}
                  className=" font-bold text-blue-500"
                >
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
                shipmentOptions={dataShipment?.shipment ?? []}
                address_id={dataShipment?.addressId ?? 0}
                store_id={dataShipment?.storeId ?? 0}
                isLoading={loadingShipment}
              />
              <div className="flex justify-between">
                <p className="font-bold text-base">Pesanan</p>
                <p className="flex text-gray-400 text-base gap-1">
                  {dataCart.length > 0
                    ? dataCart.reduce((total, item) => total + item.quantity, 0)
                    : ''}
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
          <div className="hidden lg:flex lg:flex-col space-y-5 w-1/4 sticky top-20">
            <CheckoutTotalShipment />
          </div>
        </div>
      </div>
      {showModal && (
        <ModalChangeAddress
          showModal={showModal}
          setShowModal={setShowModal}
          onReturnStep={onReturnStep}
        />
      )}
    </div>
  );
};
