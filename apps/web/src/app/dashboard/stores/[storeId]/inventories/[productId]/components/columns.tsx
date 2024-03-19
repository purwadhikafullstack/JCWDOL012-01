'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export type Task = {
  id: string;
  title: string;
  status: string;
  label: string;
  priority: string;
};

export const columns: ColumnDef<Task>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'typeLog',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type Log" />
    ),
    cell: ({ row }) => {
      const typeLog = row.getValue('typeLog');

      return <div className={`${typeLog === 'Addition' ? 'text-green-500' : 'text-red-500'} w-[80px]`}>{row.getValue('typeLog')}</div>;
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      const typeLog = row.getValue('typeLog');
      
      return (
        <div className="flex space-x-2">
          <span className={`${typeLog === 'Addition' ? 'text-green-500' : 'text-red-500'} max-w-[500px] truncate font-medium`}>
            {row.getValue('quantity')}
          </span>
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
      const typeLog = row.getValue('typeLog');
      
      return (
        <div className="flex space-x-2">
          <span className={`${typeLog === 'Addition' ? 'text-green-500' : 'text-red-500'} max-w-[500px] truncate text-sm`}>
            {new Date(row.getValue('createdAt')).toLocaleString('en-US')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => {
      const typeLog = row.getValue('typeLog');
      
      return (
        <div className="flex space-x-2">
          <span className={`${typeLog === 'Addition' ? 'text-green-500' : 'text-red-500'} max-w-[500px] truncate text-sm`}>
            {new Date(row.getValue('updatedAt')).toLocaleString('en-US')}
          </span>
        </div>
      );
    },
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
