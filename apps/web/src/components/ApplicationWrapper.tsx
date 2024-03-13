'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import SideNavbar from './SideNavbar';

export default function ApplicationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  if (usePathname().includes(`/dashboard`))
    return (
      <div className="min-h-screen w-full bg-white text-black flex">
        {/* sidebar */}
        <SideNavbar />
        {/* main page */}
        {children}
      </div>
    );

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
