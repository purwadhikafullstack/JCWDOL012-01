'use client';

import { Delete, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ColumnDef } from '@tanstack/react-table';
import EditCategory from '@/components/dashboard/EditCategory';
import DeleteCategory from '@/components/dashboard/DeleteCategory';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Category = {
  id: string;
  name: string;
  totalProduct: number;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'totalProduct',
    header: 'Total Product',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const category = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col items-start p-2 gap-2">
              <EditCategory id={Number(category.id)} name={category.name} />
              <DeleteCategory id={Number(category.id)} name={category.name} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
