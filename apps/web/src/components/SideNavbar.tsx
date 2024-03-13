'use client';

import { useState } from 'react';
import { Nav } from './ui/nav';

import {
  ChevronRight,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  UsersRound,
} from 'lucide-react';
import { Button } from './ui/button';

type Props = {};
const SideNavbar = (props: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toogleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

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
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutDashboard,
            variant: 'default',
          },
          {
            title: 'Users',
            href: '/users',
            icon: UsersRound,
            variant: 'ghost',
          },
          {
            title: 'Ordrs',
            href: '/orders',
            icon: ShoppingCart,
            variant: 'ghost',
          },
          {
            title: 'Settings',
            href: '/settings',
            icon: Settings,
            variant: 'ghost',
          },
        ]}
      />
    </div>
  );
};
export default SideNavbar;
