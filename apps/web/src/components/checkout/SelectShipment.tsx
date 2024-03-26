import { useCheckout } from '@/hooks/useCheckout';
import { formatToRupiah } from '@/lib/formatToRupiah';
import { ShippingCost } from '@/utils/shipmentType';
import { useEffect, useState } from 'react';
import LoadingComponent from '../LoadingComponent';

interface Props {
  shipmentOptions: any;
  address_id: number;
  store_id: number;
  isLoading: boolean;
}

export function SelectShipment({
  shipmentOptions,
  address_id,
  store_id,
  isLoading,
}: Props) {
  const { setShippingDetails, shipment } = useCheckout();
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    if (shipmentOptions.length > 0 && selectedOption === '') {
      const initialOption = shipmentOptions[0].costs[0];
      const { service, cost } = initialOption;
      const { value } = cost[0];
      const data = {
        address_id,
        store_id,
        amount: value,
        type: service,
        courier: shipmentOptions[0].courier,
      };
      setShippingDetails(data);
      setSelectedOption(initialOption);
    }
  }, [
    shipmentOptions,
    selectedOption,
    address_id,
    store_id,
    setShippingDetails,
  ]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const shipment = shipmentOptions.find((item: any) => {
      return item.costs.some((cost: any) => cost.service === selectedValue);
    });
    if (shipment) {
      const courier = shipment.courier;
      const costItem = shipment.costs.find(
        (cost: any) => cost.service === selectedValue,
      );
      if (costItem && costItem.cost.length > 0) {
        const value = costItem.cost[0].value;
        const data = {
          address_id,
          store_id,
          amount: value,
          type: selectedValue,
          courier,
        };
        setShippingDetails(data);
      }
    }
  };

  return (
    <div className="relative w-full">
      <select
        className="block w-full py-2 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="" disabled hidden>
          Pilih Pengiriman
        </option>
        {!isLoading &&
          shipmentOptions.map((option: any, index: any) => (
            <optgroup label={option.code} key={index}>
              {option.costs.map((cost: any, costIndex: any) => (
                <option key={costIndex} value={cost.service}>
                  {cost.service} - Estimasi {cost.cost[0].etd} hari -{' '}
                  {formatToRupiah(Number(cost.cost[0].value))}
                </option>
              ))}
            </optgroup>
          ))}
      </select>
    </div>
  );
}
