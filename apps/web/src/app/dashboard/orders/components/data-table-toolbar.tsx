'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DateOrder } from '@/components/listOrder/DateOrder';
import { FilterOrder } from '@/components/listOrder/FilterOrder';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

const handleSearch = (term: string) => {};

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-5">
        <input
          placeholder="Search invoice"
          type="search"
          className="border border-slate-200 rounded-sm p-2 items-start"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <DateOrder />
      </div>
      <FilterOrder status={status} />
    </div>
  );
}
