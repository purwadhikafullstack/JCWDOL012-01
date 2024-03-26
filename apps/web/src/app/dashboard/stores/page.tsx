import StoreList from '@/components/dashboard/StoreList';
import { Store } from 'lucide-react';

export default function DashboardStore() {
  return (
    <div className="hidden w-1/2 h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <Store />
            Store List
          </h2>
          <p className="text-muted-foreground">Here&apos;s a list of stores!</p>
        </div>
      </div>
      <StoreList />
    </div>
  );
}
