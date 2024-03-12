import { Voucher } from '@/utils/voucherTypes';
import { useState, useEffect } from 'react';

interface Props {
  voucher: Voucher;
  selectedVoucher: Voucher | null;
  handleVoucherSelect: (voucher: Voucher | null) => void;
}

export const ListVoucher = ({
  voucher,
  selectedVoucher,
  handleVoucherSelect,
}: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(selectedVoucher?.id === voucher.id);
  }, [selectedVoucher]);

  const handleChange = () => {
    if (selectedVoucher && selectedVoucher.id === voucher.id) {
      handleVoucherSelect(null);
    } else {
      handleVoucherSelect(voucher);
    }
  };

  return (
    <label>
      <div
        className={`border-2 p-2 flex justify-between text-base rounded-md `}
      >
        <div className="flex flex-col gap-1">
          <p className="flex gap-1">{voucher.voucher_code}</p>
        </div>
        <input
          type="checkbox"
          id={voucher.id.toString()}
          checked={isChecked}
          onChange={handleChange}
        />
      </div>
    </label>
  );
};
