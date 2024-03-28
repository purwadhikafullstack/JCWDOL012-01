'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IoMdArrowDropdown } from 'react-icons/io';
import useStores from '@/hooks/useStores';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function SelectStore({ orders }: { orders: any }) {
  const [selectedStore, setSelectedStore] = useState('All Stores');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const { data } = useStores();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedStore && selectedStore !== 'All Stores') {
      params.set('store', selectedStore);
      params.delete('page');
    } else {
      params.delete('store');
    }
    router.replace(`${pathname}?${params.toString()}`);

    if (selectedStore && data && data.results) {
      const selectedStoreData = data.results.find(
        (store: any) => store.id === selectedStore,
      );
      if (selectedStoreData) {
        setSelectedCity(selectedStoreData.city);
        setSelectedProvince(selectedStoreData.province);
      }
    }
  }, [selectedStore, pathname, router, searchParams, data]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex w-60 items-center justify-between text-base"
          variant="outline"
        >
          {selectedStore !== 'All Stores'
            ? `${selectedCity}, ${selectedProvince}`
            : selectedStore}
          <IoMdArrowDropdown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>List Store</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedStore}
          onValueChange={setSelectedStore}
        >
          <DropdownMenuRadioItem value="All Stores">
            All Stores
          </DropdownMenuRadioItem>
          {data &&
            data.results.map((store: any) => (
              <DropdownMenuRadioItem key={store.id} value={store.id}>
                {`${store.city}, ${store.province}`}
              </DropdownMenuRadioItem>
            ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
