import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatToRupiah } from '@/lib/formatToRupiah';

interface Props {
  shipmentOptions: ShippingCost[];
}

export function SelectShipment({ shipmentOptions }: Props) {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Pilih Pengiriman" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Pengiriman</SelectLabel>
          {shipmentOptions.map((option, index) => (
            <SelectItem key={index} value={option.service}>
              <div className="flex flex-col items-start">
                <p className="font-semibold">{option.service}</p>
                <div className="flex gap-2">
                  <p>Estimasi tiba {option.cost[0].etd} hari</p>|
                  <p className="font-semibold">
                    {formatToRupiah(option.cost[0].value)}
                  </p>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
