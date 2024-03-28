'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import SideNavbar from './SideNavbar';

import SideNavbarUser from './SideNavbarUser';
import Navbar from './Navbar';

export default function ApplicationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname.includes(`/dashboard`))
    return (
      <div className="min-h-screen w-full bg-white text-black flex">
        {/* sidebar */}
        <SideNavbar />
        {/* main page */}
        {children}
      </div>
    );
  else if (pathname.includes(`/customer`))
    return (
      <>
        <Navbar />
        <div className=" bg-gray-100 ">
          <div className="wrapper min-h-screen w-full text-black flex">
            {/* sidebar */}
            <SideNavbarUser />
            {/* main page */}
            {children}
          </div>
        </div>
      </>
    );
  else if (pathname.includes(`/checkout`))
    return (
      <div className="relative min-h-screen w-full bg-gray-100 ">
        {children}
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="relative h-auto w-full bg-gray-100 ">{children}</div>
      <Footer />
    </>
  );
}
