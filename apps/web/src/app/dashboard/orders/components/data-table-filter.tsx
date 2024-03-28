'use client';
import UseGetOrders from '@/hooks/useGetOrders';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { DateOrder } from '@/components/listOrder/DateOrder';
import { FilterOrder } from '@/components/listOrder/FilterOrder';
import { columns } from './columns';
import { DataTable } from './data-table';
import { SelectStore } from '../selectStore';

const DataFilter = ({
  invoice,
  currentPage,
  status,
  startDate,
  endDate,
  session,
  store,
}: {
  invoice: string;
  currentPage: number;
  status: string;
  startDate: string;
  endDate: string;
  session: string;
  store: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { data, isLoading, isError } = UseGetOrders({
    status: status,
    page: currentPage,
    invoice: invoice,
    start_date: startDate,
    end_date: endDate,
    store,
  });

  const orders = data?.result.map((order: any, index: number) => ({
    no: index + 1,
    id: order.id,
    total: order.total,
    status: order.status,
    createdAt: order.createdAt,
    payment: order.payment.map((payment: any) => ({
      invoice: payment.invoice,
    })),
    order_Items: order.order_Items.map((item: any) => ({
      store: {
        city: item.store.city,
        province: item.store.province,
      },
    })),
  }));

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('invoice', term);
      params.delete('page');
    } else {
      params.delete('invoice');
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 2000);

  return (
    <div className="relative bg-white flex flex-col gap-3">
      {session == 'Super_Admin' && <SelectStore orders={orders ?? []} />}
      <div className="flex justify-between">
        <div className="flex gap-5">
          <input
            placeholder="Cari Transaksimu Disini"
            type="search"
            className="border border-slate-200 rounded-sm p-2 items-start"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <DateOrder />
        </div>
        <FilterOrder status={status} />
      </div>
      <DataTable data={orders ?? []} columns={columns} />,
    </div>
  );
};

export default DataFilter;
