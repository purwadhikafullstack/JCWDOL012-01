'use client';
import { CartItem } from '@/utils/cartTypes';
import { CheckoutContextType } from '@/utils/checkoutTypes';
import { PaymentMethod } from '@/utils/paymentTypes';
import { ShippingDetails } from '@/utils/shipmentType';
import React, { createContext, useState, ReactNode } from 'react';

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined,
);

const CheckoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
  const [voucher, setVoucher] = useState<string | null>(null);
  const [shippingCost, setShippingCost] = useState<ShippingDetails>({
    addressId: 0,
    storeId: 0,
    shippingCost: 0,
    shippingType: '',
  });
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('transfer_manual');
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const addOrderItems = (items: CartItem[]) => {
    setOrderItems(items);
    const newTotalPrice = items.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0,
    );
    setTotalPrice(newTotalPrice);
  };

  const removeOrderItem = (index: number) => {
    const removedItem = orderItems[index];
    const updatedItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedItems);
    setTotalPrice(totalPrice - parseFloat(removedItem.price));
  };

  const clearOrderItems = () => {
    setOrderItems([]);
    setTotalPrice(0);
  };

  const applyVoucher = (voucherId: string) => {
    setVoucher(voucherId);
  };

  const setShippingDetails = (details: ShippingDetails) => {
    setShippingCost(details);
    setTotalPrice(totalPrice + details.shippingCost);
  };

  const selectPaymentMethod = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };

  const resetShippingCost = () => {
    setShippingCost({
      addressId: 0,
      storeId: 0,
      shippingCost: 0,
      shippingType: '',
    });
  };

  return (
    <CheckoutContext.Provider
      value={{
        orderItems,
        voucher,
        shippingCost,
        paymentMethod,
        totalPrice,
        addOrderItems,
        removeOrderItem,
        clearOrderItems,
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
