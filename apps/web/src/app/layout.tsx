import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ApplicationWrapper from '@/components/ApplicationWrapper';
import { Toaster } from '@/components/ui/toaster';
import { CookiesProvider } from 'next-client-cookies/server';
import QueryProvider from '@/provider/QueryProvider';
import { CartProvider } from '@/provider/CartProvider';
import { CheckoutProvider } from '@/provider/CheckoutProvider';
import SessionProvider from '@/provider/SessionProvider';
import { UserProvider } from '@/provider/UserProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Belanja Nusantara',
  description: 'Grocery Online by Belanja',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CookiesProvider>
          <QueryProvider>
            <UserProvider>
              <SessionProvider>
                <CartProvider>
                  <ApplicationWrapper>
                    <CheckoutProvider>
                      {children}
                      <Toaster />
                    </CheckoutProvider>
                  </ApplicationWrapper>
                </CartProvider>
              </SessionProvider>
            </UserProvider>
          </QueryProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
