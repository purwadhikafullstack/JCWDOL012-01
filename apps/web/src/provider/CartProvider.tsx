'use client';
import { CartContextType, CartItem } from '@/utils/cartTypes';
import { useContext, createContext, useState } from 'react';
import useGetCart from '@/hooks/useGetCart';
import { useEffect } from 'react';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError, refetch } = useGetCart();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalCart, setTotalCart] = useState(0);

  useEffect(() => {
    if (data) {
      setCart(data);

      if (!Array.isArray(data) || data.length === 0) {
        setTotalCart(0);
        return;
      }

      let totalPrice = 0;
      data.forEach((item) => {
        totalPrice += Number(item.price) * item.quantity;
      });

      setTotalCart(totalPrice);
    }
  }, [data]);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalCart,
        isLoading,
        isError,
        setCart,
        refetch,
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
