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
import { Button } from '../ui/button';
import useDeleteCategory from '@/hooks/useDeleteCategory';
import useCategories from '@/hooks/useCategories';
import { useToast } from '../ui/use-toast';

type Props = {
  id: number;
  name: string;
};

export default function DeleteCategory({ id, name }: Props) {
  const { refetch } = useCategories();
  const { mutate, isPending } = useDeleteCategory();
  const { toast } = useToast();

  const handleDelete = () => {
    mutate(
      { id },
      {
        onSuccess: () => {
          toast({
            variant: 'success',
            title: 'Category deleted !',
          });
          refetch();
        },
        onError: (res: any) => {
          toast({
            variant: 'destructive',
            title: 'Category Failed to delete !',
            description: res?.response?.data?.message,
          });
        },
      },
    );
  };

  return (
    <Dialog>
      <DialogTrigger className="text-red-500">Delete</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            Category cannot deleted, if some product have this category !
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                handleDelete();
              }}
            >
              Yes !
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
