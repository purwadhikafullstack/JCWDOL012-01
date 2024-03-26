import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ApplicationWrapper from '@/components/ApplicationWrapper';
import { Toaster } from '@/components/ui/toaster';
import { CookiesProvider } from 'next-client-cookies/server';
import QueryProvider from '@/provider/QueryProvider';
import { CartProvider } from '@/provider/CartProvider';
import { UserProvider } from '@/provider/userProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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
      <UserProvider>
        <CookiesProvider>
          <QueryProvider>
            <CartProvider>
              <ApplicationWrapper>
              <Header />
                {children}
                <Footer />
                <Toaster />
              </ApplicationWrapper>
            </CartProvider>
          </QueryProvider>
        </CookiesProvider>
      </UserProvider>
      </body>
    </html>
  );
}
