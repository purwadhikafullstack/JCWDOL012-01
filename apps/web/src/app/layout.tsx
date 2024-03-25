import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import { CookiesProvider } from 'next-client-cookies/server';
import QueryProvider from '@/provider/QueryProvider';
import { CartProvider } from '@/provider/CartProvider';
import { UserProvider } from '@/provider/userProvider';

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
                <Header />
                {children}
                <Footer />
              </CartProvider>
            </QueryProvider>
          </CookiesProvider>
        </UserProvider>
      </body>
    </html>
  );
}
