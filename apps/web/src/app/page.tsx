'use client';
import { Header } from '@/components/Header';
import { Navbar } from '@/components/Navbar';
import { useDialog } from '@/hooks/useDialog';

import useGetCart from '@/hooks/useGetCart';
import { useCart } from '@/provider/CartProvider';
import { useUser } from '@/provider/UserProvider';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCookies } from 'next-client-cookies';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  category_id: number;
  image: string[];
  price: string;
}

export default function Home() {
  const cookies = useCookies();
  const { onOpenLogin, onOpenRegister } = useDialog();
  const { setUser, user } = useUser();
  const [product, setProduct] = useState<Product[] | null>(null);
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ['product'],
    queryFn: async () => {
      try {
        const response = await axios.get<Product[]>(
          'http://localhost:8000/api/products',
        );
        return response.data;
      } catch (error) {
        console.error('Error fetching product', error);
        throw new Error('Error fetching product');
      }
    },
  });
  return (
    <div>
      <div className="wrapper">
        <button onClick={onOpenLogin}>open login</button>
        {/* <LocationComponent /> */}
        <div>{user}</div>
        {data?.map((product) => (
          <div key={product.id}>
            <Link href={`/products/1/${product.id}`}>
              <div>{product.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
