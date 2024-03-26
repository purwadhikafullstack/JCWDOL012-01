import Image from 'next/image';
import React from 'react';

const LoadingPage = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="relative">
        <Image
          src="/logo.png"
          height={100}
          width={100}
          className="w-16 h-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse"
          alt="Logo"
        />
        <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
