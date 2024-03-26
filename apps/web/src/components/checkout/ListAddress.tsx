import useGetUser from '@/hooks/useGetUser';
import { UserAddress } from '@/utils/addressTypes';

interface Props {
  userAddress: UserAddress;
  selectedAddress: UserAddress | null;
  handleAddressSelect: (address: UserAddress) => void;
}

export const ListAddress = ({
  userAddress,
  selectedAddress,
  handleAddressSelect,
}: Props) => {
  const { data, isLoading, isError } = useGetUser();
  return (
    <label>
      <div className="relative">
        {' '}
        {/* Menambahkan relative positioning */}
        <div
          className={`border-2 p-2 flex justify-between text-base rounded-md ${
            userAddress.id === selectedAddress?.id ? 'border-blue-500' : ''
          }`}
        >
          <div className="flex flex-col gap-1">
            <p className="flex gap-1">
              Kirim ke{' '}
              <span className="font-semibold">{userAddress.label}</span>
            </p>
            <p className="flex gap-1">
              <span className="font-semibold">{data?.user_name}</span>
              {data?.telephone}
            </p>
            <p>
              {userAddress.street},{userAddress.city}
            </p>
          </div>
          <input
            type="radio"
            id={userAddress.id.toString()}
            name="address"
            className="appearance-none"
            checked={userAddress.id === selectedAddress?.id}
            onChange={() => handleAddressSelect(userAddress)}
          />
        </div>
        {userAddress.id === selectedAddress?.id && (
          <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
            Aktif
          </div>
        )}
      </div>
    </label>
  );
};
