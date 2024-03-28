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
import { useState } from 'react';
import { useToast } from '../ui/use-toast';
import { Plus } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import useAddStock from '@/hooks/useAddStock';
import useStoreInventories from '@/hooks/useStoreInventories';

type Props = {
  storeId: string;
  productId: string;
  quantity: number;
};

export default function AddStock({ storeId, productId, quantity }: Props) {
  const [qty, setQty] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const { mutate, isPending, isError } = useAddStock();
  const { refetch } = useStoreInventories({ id: storeId });
  const { toast } = useToast();

  const handleAddStock = () => {
    mutate(
      { storeId, productId, qty },
      {
        onSuccess: () => {
          toast({
            variant: 'success',
            title: 'Stock updated successfully !',
          });
          refetch();
          setOpen(false);
        },
        onError: (res: any) => {
          toast({
            variant: 'destructive',
            title: 'Failed to update stock !',
            description: res?.response?.data?.message,
          });
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(e) => setOpen(e)}>
      <DialogTrigger>
        <span className="text-green-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Stock
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Stock Product !</DialogTitle>
          <DialogDescription>Stock now: {quantity}</DialogDescription>
          {!!qty && (
            <DialogDescription>Stock after: {quantity + qty}</DialogDescription>
          )}
        </DialogHeader>
        <div className="grid flex-1 gap-2">
          <Input
            type="number"
            min={1}
            onChange={(e) => setQty(Number(e.target.value))}
          />
        </div>

        <DialogFooter>
          <Button type="submit" disabled={isPending} onClick={handleAddStock}>
            Confirm !
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
