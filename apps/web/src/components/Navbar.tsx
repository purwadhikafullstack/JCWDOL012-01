import { useState } from 'react';
import { Cart } from './Cart';

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">My Shop</h1>
      <div className="flex justify-between gap-5">
        <Cart />
        <h1>profile</h1>
      </div>
    </nav>
  );
};
