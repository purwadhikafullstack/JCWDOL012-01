'use client';

import { Command, UserPlus, Users } from 'lucide-react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import useUsers from '@/hooks/useUsers';
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function UserDashboard() {
  const { data, isLoading, isError } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error while fecthing data</div>;

  const users = data?.results?.map((user: any, i: number) => {
    return {
      id: user.id,
      user_name: user.user_name,
      email: user.email,
      role: user.role,
      telephone: user?.telephone || '',
      createdAt: user?.createdAt,
    };
  });

  return (
    <>
      <div className="hidden w-1/2 h-full flex-1 flex-col space-y-2 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <Users />
              User List
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of all users!
            </p>
            <Link
              href={`/dashboard/users/create`}
              className={cn(buttonVariants(), 'flex items-center gap-2 mt-4')}
            >
              <UserPlus className="w-4 h-4" />
              Create Store Admin
            </Link>
          </div>
        </div>
        {!!users?.length && <DataTable data={users} columns={columns} />}
      </div>
    </>
  );
}
