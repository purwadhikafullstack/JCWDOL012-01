import React from 'react';
import { CheckoutAddProduct } from './CheckoutAddProduct';
import { CheckoutDeleteProduct } from './CheckoutDeleteProduct';
import { IoIosArrowBack } from 'react-icons/io';

interface NavbarCheckoutProps {
  step: number;
  onReturnStep: () => void;
}

export const NavbarCheckout: React.FC<NavbarCheckoutProps> = ({
  step,
  onReturnStep,
}) => {
  return (
    <nav className=" bg-white text-blue-500 border-b-2 border-gray-200 shadow-md">
      <div className="wrapper flex justify-between items-center px-4 py-2">
        <div className="flex gap-1 items-center">
          {step === 2 && (
            <IoIosArrowBack
              onClick={onReturnStep}
              className="text-2xl cursor-pointer"
            />
          )}
          <h1 className="text-xl font-bold">My Shop Checkout</h1>
        </div>
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
