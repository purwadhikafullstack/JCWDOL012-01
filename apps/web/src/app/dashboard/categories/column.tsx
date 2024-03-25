'use client';

import { ColumnDef } from '@tanstack/react-table';
import CategoryAction from '@/components/dashboard/CategoryAction';

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
        <CategoryAction id={Number(category.id)} name={category.name} />
      );
    },
  },
];
