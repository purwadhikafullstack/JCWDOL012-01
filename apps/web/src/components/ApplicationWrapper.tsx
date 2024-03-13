'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';

export default function ApplicationWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  if ([`/dashboard`].includes(usePathname())) return <>{children}</>;

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
