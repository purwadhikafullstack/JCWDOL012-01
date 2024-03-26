import Image from 'next/image';
import React from 'react';

export default function CardBenefit() {
  return (
    <>
      <section className="py-10 bg-gray-100">
        <div className="mx-auto grid max-w-4xl grid-cols-0 gap-10 p-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          <div className="flex overflow-hidden">
            <Image
              className="static "
              src="/CardBenefit01.png"
              alt="Card Benefit"
              width={200}
              height={200}
            />
          </div>
          <div className="flex overflow-hidden">
            <Image
              className="static "
              src="/CardBenefit02.png"
              alt="Card Benefit"
              width={200}
              height={200}
            />
          </div>
          <div className="flex overflow-hidden">
            <Image
              className="static "
              src="/CardBenefit03.png"
              alt="Card Benefit"
              width={200}
              height={200}
            />
          </div>
          <div className="flex overflow-hidden">
            <Image
              className="static "
              src="/CardBenefit04.png"
              alt="Card Benefit"
              width={200}
              height={200}
            />
          </div>
          <div className="p-0">
            <h4 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              Belanja Online Dengan Mudah
            </h4>
          </div>
          <div className="p-0">
            <h4 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              Prosesnya Cepat
            </h4>
          </div>
          <div className="p-0">
            <h4 className="block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              Pengiriman Cepat
            </h4>
          </div>
          <div className="p-0">
            <h4 className=" block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              Bayarnya Mudah dan Murah
            </h4>
          </div>
        </div>
        <div className="mt-1 p-2"></div>
      </section>
    </>
  );
}
