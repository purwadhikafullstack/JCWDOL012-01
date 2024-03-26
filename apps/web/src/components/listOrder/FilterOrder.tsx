'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

export function FilterOrder({ status }: { status: string }) {
  const [filter, setFilter] = useState('All Order');
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (filter && filter !== 'All Order') {
      params.set('status', filter);
      params.delete('page');
    } else {
      params.delete('status');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [filter, pathname, router, searchParams]);

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
          <DropdownMenuRadioItem value="All Order">
            All Order
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="pending">pending</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="confirmation">
            confirmation
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="on_process">
            on_process
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="shipped">shipped</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="confirmed">
            confirmed
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="cancelled">
            cancelled
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
