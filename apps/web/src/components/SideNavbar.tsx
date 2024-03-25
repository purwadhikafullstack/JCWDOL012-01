'use client';

import { useState } from 'react';
import { Nav } from './ui/nav';

import {
  ChevronRight,
  LayoutDashboard,
  UsersRound,
  ScrollText,
  NotebookPen,
  Store,
} from 'lucide-react';
import { Button } from './ui/button';
import useSession from '@/hooks/useSession';

type Props = {};
const SideNavbar = (props: Props) => {
  const { session } = useSession();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toogleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const links = [
    {
      title: 'Dashboard',
      href: '/dashboard/main',
      icon: LayoutDashboard,
      variant: 'default',
    },
    {
      title: 'Product Catalog',
      href: '/dashboard/products',
      icon: NotebookPen,
      variant: 'ghost',
    },
    {
      title: 'Categories',
      href: '/dashboard/categories',
      icon: ScrollText,
      variant: 'ghost',
    },
    {
      title: 'Stores',
      href: '/dashboard/stores',
      icon: Store,
      variant: 'ghost',
    },
  ];

  if (session?.role == 'Super_Admin')
    links.splice(1, 0, {
      title: 'Users',
      href: '/dashboard/users',
      icon: UsersRound,
      variant: 'ghost',
    });

  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
      <div className="absolute right-[-20px] top-7">
        <Button
          onClick={toogleSidebar}
          variant={'secondary'}
          className="rounded-full p-2"
        >
          <ChevronRight />
        </Button>
      </div>
      <Nav isCollapsed={isCollapsed} links={links} />
    </div>
  );
};
export default SideNavbar;
