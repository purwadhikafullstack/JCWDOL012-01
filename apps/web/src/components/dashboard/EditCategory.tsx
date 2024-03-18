import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';
import useCategories from '@/hooks/useCategories';
import useEditCategory from '@/hooks/useEditCategory';
import { useToast } from '../ui/use-toast';
import { Pencil } from 'lucide-react';

type Props = {
  name: string;
  id: Number;
};
const EditCategory = ({ name, id }: Props) => {
  const [categoryName, setCategoryName] = useState(name);
  const [isOpen, setOpen] = useState(false);
  const { refetch } = useCategories();
  const { mutate, isPending } = useEditCategory();
  const { toast } = useToast();

  const handleEdit = async () => {
    mutate(
      { id: Number(id), categoryName },
      {
        onSuccess: () => {
          toast({
            variant: 'success',
            title: 'Category name updated !',
          });
          refetch();
          setOpen(false);
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: 'Category name failed to update',
          });
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(e) => setOpen(e)}>
      <DialogTrigger className='flex items-center gap-2'>
      <Pencil className='w-4 h-4' />
        Edit</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category Name</DialogTitle>
          <DialogDescription>
            Product with category &quot;{name}&quot; will be changed !{' '}
          </DialogDescription>
        </DialogHeader>
        <div className="grid flex-1 gap-2">
          <Input
            id="link"
            defaultValue={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button type="submit" onClick={handleEdit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default EditCategory;
