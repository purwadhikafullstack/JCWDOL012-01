import { useCheckout } from '@/hooks/useCheckout';
import { formatToRupiah } from '@/lib/formatToRupiah';
import { ShippingDetails } from '@/utils/shipmentType';
import { ShippingCost } from '@/utils/shipmentType';
import { useState } from 'react';

interface Props {
  shipmentOptions: ShippingCost[];
  address_id: number;
  store_id: number;
}

export function SelectShipment({
  shipmentOptions,
  address_id,
  store_id,
}: Props) {
  const { setShippingDetails, shipment } = useCheckout();
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const selectedOption = shipmentOptions.find(
      (option) => option.service === selectedValue,
    );
    if (selectedOption) {
      const { service, cost } = selectedOption;
      const { value: shippingCost } = cost[0];
      const data = {
        address_id,
        store_id,
        amount: shippingCost,
        type: service,
      };
      setShippingDetails(data);
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
        {shipmentOptions.map((option, index) => (
          <option key={index} value={option.service}>
            {option.service} - Estimasi tiba {option.cost[0].etd} hari |{' '}
            {formatToRupiah(option.cost[0].value)}
          </option>
        ))}
      </select>
    </div>
  );
}
