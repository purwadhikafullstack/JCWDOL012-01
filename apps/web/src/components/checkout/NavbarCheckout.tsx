import React from 'react';
import { CheckoutAddProduct } from './CheckoutAddProduct';
import { CheckoutDeleteProduct } from './CheckoutDeleteProduct';
import { IoIosArrowBack } from 'react-icons/io';
import { ModalAddress } from './ModalAddress';
import { MenuCheckout } from './MenuCheckout';

interface NavbarCheckoutProps {
  step: number;
  onReturnStep: () => void;
}

export const NavbarCheckout: React.FC<NavbarCheckoutProps> = ({
  step,
  onReturnStep,
}) => {
  return (
    <nav className="bg-white text-blue-500 shadow-lg h-10 sm:h-16 z-10 sticky top-0">
      <div className="wrapper flex justify-between items-center h-10 sm:h-16 border-b">
        <div className="flex gap-1 justify-center items-center">
          {step === 2 && (
            <IoIosArrowBack
              onClick={onReturnStep}
              className="text-2xl cursor-pointer"
            />
          )}
          <h1 className="text-xl font-bold">My Shop Checkout</h1>
        </div>
        {step === 1 && (
          <>
            <div className="hidden lg:flex justify-between items-center gap-5">
              <CheckoutAddProduct />
              <CheckoutDeleteProduct />
            </div>
            <div className="flex lg:hidden items-center">
              <MenuCheckout />
            </div>
          </>
        )}
      </div>
      {step === 1 && (
        <div className="flex lg:hidden mx-auto bg-white shadow-lg  z-10 sticky bottom-0 border-none rounded-b-full">
          <ModalAddress />
        </div>
      )}
    </nav>
  );
};
