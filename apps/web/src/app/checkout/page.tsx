'use client';

import { CheckoutProductSelection } from '@/components/checkout/CheckoutProductSelection';
import { CheckoutShipment } from '@/components/checkout/CheckoutShipment';

import { NavbarCheckout } from '@/components/checkout/NavbarCheckout';
import { useState } from 'react';

const Checkout = () => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  return (
    <>
      <NavbarCheckout step={step} />
      {step === 1 && <CheckoutProductSelection onNextStep={handleNextStep} />}
      {step === 2 && <CheckoutShipment />}
    </>
  );
};

export default Checkout;
