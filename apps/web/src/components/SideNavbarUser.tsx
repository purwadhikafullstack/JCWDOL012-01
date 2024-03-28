import { UsersRound, Tag, Ticket } from 'lucide-react';
import { NavUser } from './ui/navUser';

type Props = {};
const SideNavbarUser = (props: Props) => {
  return (
    <div className="hidden lg:relative lg:flex min-w-[80px] w-64 pt-4 pb-10 ">
      <NavUser
        links={[
          {
            title: 'Informasi Akun',
            href: '/customer/account',
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
