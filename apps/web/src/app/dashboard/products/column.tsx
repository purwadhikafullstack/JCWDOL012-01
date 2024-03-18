'use client';

import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  no: number;
  id: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  category: string;
  updatedAt: Date;
  createdAt: Date;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'no',
    header: 'No.',
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const product = row.original;

      return (
        <Link href={`/dashboard/products/${product.id}`}>{product.name}</Link>
      );
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      const product = row.original;
      return product.description?.length < 20 ? (
        <span>{product.description}</span>
      ) : (
        <span>{product.description.substring(0, 20)}...</span>
      );
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'weight',
    header: 'Weight',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => {
      const product = row.original;
      return (
        <span className="text-xs">
          {new Date(product.updatedAt).toLocaleString('en-US')}
        </span>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const product = row.original;
      return (
        <span className="text-xs">
          {new Date(product.createdAt).toLocaleString('en-US')}
        </span>
      );
    },
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const category = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuSeparator />
  //           <div className="flex flex-col items-start p-2 gap-2">
  //             <EditCategory id={Number(category.id)} name={category.name} />
  //             <DeleteCategory id={Number(category.id)} name={category.name} />
  //           </div>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
