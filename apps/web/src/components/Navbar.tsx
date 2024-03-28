'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CartButton } from './cart/CartButton';
import DialogLogin from './DialogLogin';
import DialogForm from './DialogRegister';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="z-50 sticky bg-blue-600 top-0 p-2  overflow-x-hidden overflow-y-auto">
      {/* Navbar for desktop */}
      <div className=" wrapper hidden md:flex justify-between items-center max-w-5xl ">
        <a href="/" className="text-white text-xl font-bold">
          <Image
            src="/LogoNavbar.png"
            alt="Logo Navbar"
            className="p-2"
            width={150}
            height={150}
          />
        </a>
        <div className="">
          <a href="#" className="text-white">
            Category
          </a>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="flx justify-center px-4 py-2 rounded-3xl focus:outline-none focus:ring focus:border-blue-300 bg-white text-white"
        />
        <div className="flex items-center text-white space-x-14">
          <CartButton />
          <a href="/login" className="text-white">
            Login
          </a>
          <a href="/auth/Register" className="text-white">
            Sign Up
          </a>
        </div>
        <DialogLogin />
        <DialogForm />
      </div>

      {/* Navbar for mobile */}
      <div className="md:hidden flex justify-between items-center">
        <a href="/" className="text-white text-xl font-bold">
          Logo
        </a>
        <button className="text-white" onClick={toggleNavbar}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <div className="flex flex-col space-y-2 ">
            <input
              type="text"
              placeholder="Search"
              className="block w-full px-4 py-2 rounded-3xl focus:outline-none focus:ring focus:border-blue-300 bg-white text-white mb-2"
            />
            <a href="#" className="text-white">
              Category
            </a>
            <a href="#" className="text-white">
              Cart
            </a>
            <a href="/login" className="text-white">
              Login
            </a>
            <a href="#" className="text-white">
              Sign Up
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
