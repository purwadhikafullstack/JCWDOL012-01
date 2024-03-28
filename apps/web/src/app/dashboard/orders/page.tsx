'use client';

import { Command, Tag, UserPlus, Users } from 'lucide-react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';
import UseGetOrders from '@/hooks/useGetOrders';
import useSession from '@/hooks/useSession';
import LoadingComponent from '@/components/LoadingComponent';
import { SelectStore } from './selectStore';
import DataFilter from './components/data-table-filter';

const DashboardCopy = ({
  searchParams,
}: {
  searchParams?: {
    invoice?: string;
    status?: string;
    start_date?: string;
    end_date?: string;
    page?: string;
    store?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const invoice = searchParams?.invoice || '';
  const status = searchParams?.status || '';
  const startDate = searchParams?.start_date || '';
  const endDate = searchParams?.end_date || '';
  const store = searchParams?.store || '';
  const { session } = useSession();

  return (
    <>
      <div className="hidden w-1/2 h-full flex-1 flex-col space-y-2 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
              <Tag />
              Order List
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of all orders!
            </p>
          </div>
        </div>
        <DataFilter
          invoice={invoice}
          currentPage={currentPage}
          status={status}
          startDate={startDate}
          endDate={endDate}
          session={session}
          store={store}
        />
      </div>
    </>
  );
};

export default DashboardCopy;
