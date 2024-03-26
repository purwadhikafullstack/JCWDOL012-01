'use client';

import { useState } from 'react';
import { Nav } from './ui/nav';

import { UsersRound, Tag, Ticket } from 'lucide-react';

type Props = {};
const SideNavbarUser = (props: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="hidden lg:relative lg:flex min-w-[80px] w-52 pb-10 pt-6">
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: 'Informasi Akun',
            href: '#',
            icon: UsersRound,
            variant: 'default',
          },
          {
            title: 'Daftar Transaksi',
            href: '/customer/order',
            icon: Tag,
            variant: 'default',
          },
          {
            title: 'Kupon Saya',
            href: '#',
            icon: Ticket,
            variant: 'default',
          },
        ]}
      />
    </div>
  );
};
export default SideNavbarUser;
