'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IoMdArrowDropdown } from 'react-icons/io';

export function FilterOrder() {
  const [filter, setFilter] = React.useState('Semua Pesanan');

  const handleFilterChange = (event: any) => {
    setFilter(event.target.value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex w-60 items-center justify-between text-base"
          variant="outline"
        >
          {filter}
          <IoMdArrowDropdown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
          <DropdownMenuRadioItem value="Semua Pesanan">
            Semua Pesanan
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Menunggu Pembayaran">
            Menunggu Pembayaran
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Konfirmasi">
            Konfirmasi
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Proses">Proses</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Kirim">Kirim</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Berhasil">
            Berhasil
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Gagal">Gagal</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
