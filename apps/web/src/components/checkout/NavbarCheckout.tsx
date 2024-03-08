import React from 'react';
import { CheckoutAddProduct } from './CheckoutAddProduct';
import { CheckoutDeleteProduct } from './CheckoutDeleteProduct';

interface NavbarCheckoutProps {
  step: number;
}

export const NavbarCheckout: React.FC<NavbarCheckoutProps> = ({ step }) => {
  return (
    <nav className=" bg-white text-blue-500 border-b-2 border-gray-200 shadow-md">
      <div className="wrapper flex justify-between items-center px-4 py-2">
        <h1 className="text-xl font-bold">My Shop Checkout</h1>
        {step === 1 && (
          <div className="flex justify-between gap-5">
            <CheckoutAddProduct />
            <CheckoutDeleteProduct />
          </div>
        )}
      </div>
    </nav>
  );
};
