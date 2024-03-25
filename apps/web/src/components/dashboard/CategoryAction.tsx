'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import useSession from '@/hooks/useSession';
import { MoreHorizontal } from 'lucide-react';
import EditCategory from './EditCategory';
import DeleteCategory from './DeleteCategory';

type Props = {
  name: string;
  id: Number;
};

export default function CategoryAction({ id, name }: Props) {
  const { session } = useSession();

  if (session?.role !== 'Super_Admin') return;

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
          <EditCategory id={Number(id)} name={name} />
          <DeleteCategory id={Number(id)} name={name} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
