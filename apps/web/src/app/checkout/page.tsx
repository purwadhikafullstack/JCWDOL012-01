import { CheckoutAdress } from '@/components/CheckoutAdress';
import { CheckoutListProduct } from '@/components/CheckoutListProduct';
import { CheckoutTotal } from '@/components/CheckoutTotal';
import { CheckoutVoucher } from '@/components/CheckoutVoucher';
import { NavbarCheckout } from '@/components/NavbarCheckout';
import { IoInformationCircle } from 'react-icons/io5';

const Checkout = () => {
  return (
    <>
      <NavbarCheckout />
      <div className="bg-gray-100">
        <div className="wrapper flex w-full gap-20 justify-center">
          <div className="flex flex-col w-3/4 space-y-5">
            <div className="bg-blue-100 p-1 text-black flex gap-1 items-center rounded-md">
              <IoInformationCircle className="h-6 w-6" />
              <span className="text-sm">
                Pastikan kamu sudah menandai titik lokasi dengan benar pada
                alamat yang dipilih untuk pengantaran pesanan.
              </span>
            </div>
            <div className="flex flex-col bg-white p-5 rounded-sm">
              <div className="rounded-t-sm bg-gray-200 flex items-center gap-1">
                <div>3</div>
                <div>Products</div>
              </div>
              <CheckoutListProduct />
              <CheckoutListProduct />
              <CheckoutListProduct />
              <div className="rounded-b-sm bg-gray-200 flex items-center gap-1">
                <div className="flex w-1/2 justify-end">
                  <p>SUBTOTAL:</p>
                </div>
                <div className="flex w-1/2 justify-end pr-5">
                  <p>HARGA TOTAL</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex lg:flex-col space-y-5 w-1/4 sticky top-1 h-screen">
            <CheckoutAdress />
            <CheckoutTotal />
            <CheckoutVoucher />
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
