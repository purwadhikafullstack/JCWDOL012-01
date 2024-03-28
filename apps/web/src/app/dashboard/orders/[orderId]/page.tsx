import React from 'react';
import OrderDetail from './components/OrderDetail';

type Props = {
  params: {
    orderId: string;
  };
};

export default function page({ params: { orderId } }: Props) {
  return (
    <>
      <OrderDetail orderId={orderId} />
    </>
  );
}
