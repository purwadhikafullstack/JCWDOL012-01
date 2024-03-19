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
  const [shipment, setShipment] = useState<ShippingDetails>({
    address_id: 0,
    store_id: 0,
    amount: 0,
    type: '',
  });
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('Manual_Transfer');
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
    setShipment(details);
    setTotalPrice(totalPrice + details.amount);
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
