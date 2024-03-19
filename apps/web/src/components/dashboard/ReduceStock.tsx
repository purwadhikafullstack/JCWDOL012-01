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
import { Minus, Plus } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import useStoreInventories from '@/hooks/useStoreInventories';
import useReduceStock from '@/hooks/useReduceStock';

type Props = {
  storeId: string;
  productId: string;
  quantity: number;
};

export default function ReduceStock({ storeId, productId, quantity }: Props) {
  const [qty, setQty] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const { mutate, isPending, isError } = useReduceStock();
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
        <span className="text-yellow-700 flex items-center gap-2">
          <Minus className="w-4 h-4" />
          Reduce Stock
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reduce Stock Product !</DialogTitle>
          <DialogDescription>Stock now: {quantity}</DialogDescription>
          {!!qty && (
            <DialogDescription>Stock after: {quantity - qty}</DialogDescription>
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
