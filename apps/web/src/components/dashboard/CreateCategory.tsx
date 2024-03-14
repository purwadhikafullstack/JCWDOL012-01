import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button, buttonVariants } from '../ui/button';
import { useState } from 'react';
import useCategories from '@/hooks/useCategories';
import { useToast } from '../ui/use-toast';
import { Input } from '../ui/input';
import { CircleFadingPlus } from 'lucide-react';
import useCreateCategory from '@/hooks/useCreateCategory';
import { cn } from '@/lib/utils';

export default function CreateCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [isOpen, setOpen] = useState(false);
  const { mutate, isPending, isError } = useCreateCategory();
  const { refetch } = useCategories();
  const { toast } = useToast();

  const handleCreateCategory = () => {
    mutate(
      { name: categoryName },
      {
        onSuccess: () => {
          toast({
            variant: 'success',
            title: 'Category created successfully !',
          });
          refetch();
          setOpen(false);
          setCategoryName('');
        },
        onError: (e: any) => {
          toast({
            variant: 'destructive',
            title: 'Failed to create new category!',
            description: `${e?.response?.data?.message}`,
          });
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(e) => setOpen(e)}>
      <DialogTrigger>
        <span className={cn(buttonVariants(), 'flex gap-2')}>
          <CircleFadingPlus className="w-4 h-4" />
          Create Category
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Category !</DialogTitle>
          {/* <DialogDescription>
            Product with category &quot;{name}&quot; will be changed !{' '}
          </DialogDescription> */}
        </DialogHeader>
        <div className="grid flex-1 gap-2">
          <Input
            id="link"
            defaultValue={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleCreateCategory}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
