'use client';

import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { ColumnDef } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import EditCategory from '@/components/dashboard/EditCategory';

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

      const handleDelete = async (id: number) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories/${id}`,
          { method: 'DELETE' },
        );

        const results = await res.json();
      };

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
              <EditCategory name={category.name} id={Number(category.id)} />
              <Dialog>
                <DialogTrigger className="text-red-500">Delete</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Category</DialogTitle>
                    <DialogDescription>
                      All product with category &quot;{category.name}&quot; will
                      be set to null !
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        onClick={() => {
                          handleDelete(Number(category.id));
                          location.reload();
                        }}
                      >
                        Yes !
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
