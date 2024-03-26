import { CheckoutContext } from '@/provider/CheckoutProvider';
import { CheckoutContextType } from '@/utils/checkoutTypes';
import { useContext } from 'react';

export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};
