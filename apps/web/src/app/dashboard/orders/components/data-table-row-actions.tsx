'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { History, Minus, Trash2 } from 'lucide-react';
import AddStock from '@/components/dashboard/AddStock';
import ReduceStock from '@/components/dashboard/ReduceStock';
import Link from 'next/link';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const inventory: any = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
          <Link
            href={`/dashboard/stores/${inventory?.storeId}/inventories/${inventory?.productId}`}
            className="flex items-center gap-2 text-sm"
          >
            <History className="w-4 h-4" />
            Detail Order
          </Link>
        </DropdownMenuItem>
        <div className="flex flex-col items-start p-2 gap-2">
          <AddStock
            productId={inventory?.productId}
            storeId={inventory?.storeId}
            quantity={inventory?.quantity}
          />
          <ReduceStock
            productId={inventory?.productId}
            storeId={inventory?.storeId}
            quantity={inventory?.quantity}
          />
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <span className="text-red-500 flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Delete
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
