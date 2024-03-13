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
import { Input } from '../ui/input';
import { useState } from 'react';

type Props = {
  name: string;
  id: Number;
};
const EditCategory = ({ name, id }: Props) => {
  const [categoryName, setCategoryName] = useState(name);

  const handleEdit = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/categories/${id}`, {
      method: 'PATCH',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: categoryName }),
    });

    location.reload();
  };

  return (
    <Dialog>
      <DialogTrigger>Edit</DialogTrigger>
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
