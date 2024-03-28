'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import Link from 'next/link';

export type Task = {
  priority: string;
  id: number;
  payment: {
    invoice: string;
  }[];
};

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'no',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row }) => <div className="w-[20px]">{row.getValue('no')}</div>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'invoice',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invoice" />
    ),
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex space-x-2">
          <Link href={`/dashboard/orders/${order.id}`}>
            <span className="max-w-[500px] truncate font-medium">
              {order.payment[0].invoice}
            </span>
          </Link>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue('status')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue('total')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate text-sm">
            {new Date(row.getValue('createdAt')).toLocaleString('en-US')}
          </span>
        </div>
      );
    },
  },
];
