'use client';
import { CartItem } from '@/utils/cartTypes';
import { CheckoutContextType } from '@/utils/checkoutTypes';
import { PaymentMethod } from '@/utils/paymentTypes';
import { ShippingDetails } from '@/utils/shipmentType';
import React, { createContext, useState, ReactNode } from 'react';
import { useCart } from './CartProvider';

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined,
);

const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  const { totalCart, cart } = useCart();
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
  const [voucher, setVoucher] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('Transfer_Manual');
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [shipment, setShipment] = useState<ShippingDetails>({
    address_id: 0,
    store_id: 0,
    amount: 0,
    type: '',
    courier: '',
  });

  const addOrderItems = (items: CartItem[]) => {
    setOrderItems(items);
    if (!Array.isArray(items) || items.length === 0) {
      return 0;
    }
    setTotalPrice(totalCart);
  };

  const applyVoucher = (voucherId: string) => {
    setVoucher(voucherId);
  };

  const setShippingDetails = (details: ShippingDetails) => {
    setShipment(details);
    setTotalPrice(totalCart + details.amount);
  };

  const selectPaymentMethod = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };

  const resetShippingCost = () => {
    setShipment({
      address_id: 0,
      store_id: 0,
      amount: 0,
      type: '',
      courier: '',
    });
  };

  return (
    <CheckoutContext.Provider
      value={{
        orderItems,
        voucher,
        shipment,
        paymentMethod,
        totalPrice,
        addOrderItems,
        applyVoucher,
        setShippingDetails,
        selectPaymentMethod,
        resetShippingCost,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export { CheckoutContext, CheckoutProvider };
