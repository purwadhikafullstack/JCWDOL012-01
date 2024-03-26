import Image from 'next/image';
import React from 'react';

const LoadingComponent = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-black"></div>
    </div>
  );
};

export default LoadingComponent;
