import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CheckoutContextType {
  checkoutData: CheckoutDataType | undefined;
  setCheckoutData: React.Dispatch<
    React.SetStateAction<CheckoutDataType | undefined>
  >;
}

interface CheckoutDataType {
  orderDetails: {
    products: {
      productId: number;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
    }[];
    total: number;
    voucherId?: number;
  };
  shipmentDetails: {
    userAddressId: number;
    storeId: number;
    shippingCost: number;
    shipmentType: string;
  };
  paymentDetails: {
    method: string;
    bank: string;
  };
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined,
);

export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};

interface CheckoutProviderProps {
  children: ReactNode;
}

export const CheckoutProvider = ({
  children,
}: CheckoutProviderProps): JSX.Element => {
  const [checkoutData, setCheckoutData] = useState<
    CheckoutDataType | undefined
  >(undefined);

  const values: CheckoutContextType = {
    checkoutData,
    setCheckoutData,
  };

  return (
    <CheckoutContext.Provider value={values}>
      {children}
    </CheckoutContext.Provider>
  );
};
