'use client';
import { CartContextType, CartItem } from '@/utils/cartTypes';
import { useContext, createContext, useState } from 'react';
import useGetCart from '@/hooks/useGetCart';
import { useEffect } from 'react';
import useDeleteCart from '@/hooks/UseDeleteCart';
import useUpdateCart from '@/hooks/useUpdateCart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: cartData, isLoading, isError, refetch } = useGetCart();
  const [cart, setCart] = useState<CartItem[]>([]);
  const { mutate: deleteCartItem } = useDeleteCart();
  const { mutate: updateCartItem, isPending } = useUpdateCart();

  useEffect(() => {
    if (cartData) {
      setCart(cartData);
    }
  }, [cartData]);

  const removeFromCart = (cartId: number) => {
    try {
      deleteCartItem({ cartId });
      setCart((prevCart) => prevCart.filter((cart) => cart.id !== cartId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateCart = (cartId: number, quantity: number) => {
    try {
      updateCartItem({ cartId, quantity });
    } catch (error) {
      console.error('Error update cart:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        isError,
        setCart,
        refetchCart: refetch,
        removeFromCart,
        updateCart,
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
