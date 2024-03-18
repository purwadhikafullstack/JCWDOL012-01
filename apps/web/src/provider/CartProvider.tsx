'use client';
import { CartContextType, CartItem } from '@/utils/cartTypes';
import { useContext, createContext, useState } from 'react';
import useGetCart from '@/hooks/useGetCart';
import { useEffect } from 'react';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: cartData, isLoading, isError, refetch } = useGetCart();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (cartData) {
      setCart(cartData);
    }
  }, [cartData]);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        isError,
        setCart,
        refetchCart: refetch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
