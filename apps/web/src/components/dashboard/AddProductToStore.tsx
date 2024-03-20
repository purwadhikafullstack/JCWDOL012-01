'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button, buttonVariants } from '../ui/button';
import { Table } from '@tanstack/react-table';
import useAddProductToStore from '@/hooks/useAddProductToStore';
import { useParams } from 'next/navigation';
import { useToast } from '../ui/use-toast';
import useProducts from '@/hooks/useProducts';

interface DataTableAddProductProps<TData> {
  table: Table<TData>;
}

export default function AddProductToStore<TData>({
  table,
}: DataTableAddProductProps<TData>) {
  const {refetch} = useProducts()
  const [isOpen, setOpen] = useState(false);
  const { mutate, isPending } = useAddProductToStore();
  const { toast } = useToast();

  const storeId = useParams()?.storeId as string

  const handleAddProductToStore = () => {
    table.getSelectedRowModel().rows?.map((row: any) => {
      const product = row?.original;
      mutate(
        { storeId, productId: product.productId },
        {
          onSuccess: () => {
            toast({
              variant: 'success',
              title: `Product Successfully to added !`,
            });
            refetch();
            setOpen(false)
          },
          onError: (res: any) => {
            toast({
              variant: 'destructive',
              title: `Product with id ${product.productId} failed to added !`,
              description: res?.response?.data?.message,
            });
          },
        },
      );
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(e) => setOpen(e)}>
      <DialogTrigger className="w-full">
        <span className={cn(buttonVariants(), 'w-full')}>Add to Store</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product to Store !</DialogTitle>
          <DialogDescription>
            Will be added {table.getSelectedRowModel().rows?.length} products
            into store inventories
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="submit"
            // disabled={isPending}
            onClick={handleAddProductToStore}
          >
            Confirm !
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
