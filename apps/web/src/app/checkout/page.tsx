'use client';
import { CheckoutProductSelection } from '@/components/checkout/CheckoutProductSelection';
import { CheckoutShipment } from '@/components/checkout/CheckoutShipment';
import { NavbarCheckout } from '@/components/checkout/NavbarCheckout';
import { TotalProductMobile } from '@/components/checkout/TotalProductMobile';
import { useCheckout } from '@/hooks/useCheckout';
import { useState } from 'react';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const { resetShippingCost } = useCheckout();

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleReturnStep = () => {
    setStep(step - 1);
    if (step === 2) {
      resetShippingCost();
    }
  };

  return (
    <div>
      <NavbarCheckout step={step} onReturnStep={handleReturnStep} />
      {step === 1 && <CheckoutProductSelection onNextStep={handleNextStep} />}
      {step === 2 && <CheckoutShipment onReturnStep={handleReturnStep} />}
      <TotalProductMobile step={step} />
    </div>
  );
};

export default Checkout;
