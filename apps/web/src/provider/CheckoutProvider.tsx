import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CheckoutContextType {
  currentStep: number;
  checkoutData: any; // Sesuaikan tipe data dengan informasi checkout Anda
  paymentState: any; // Sesuaikan tipe data dengan informasi pembayaran Anda
  moveToNextStep: () => void;
  moveToPreviousStep: () => void;
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
  const [currentStep, setCurrentStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState<any>({});
  const [paymentState, setPaymentState] = useState<any>({});

  const moveToNextStep = (): void => setCurrentStep((prevStep) => prevStep + 1);
  const moveToPreviousStep = (): void =>
    setCurrentStep((prevStep) => prevStep - 1);

  const values: CheckoutContextType = {
    currentStep,
    checkoutData,
    paymentState,
    moveToNextStep,
    moveToPreviousStep,
  };

  return (
    <CheckoutContext.Provider value={values}>
      {children}
    </CheckoutContext.Provider>
  );
};
