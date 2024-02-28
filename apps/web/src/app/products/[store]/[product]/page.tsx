'use client';
import { useParams } from 'next/navigation';
const page = () => {
  const { store } = useParams();
  return <div>page{store}</div>;
};

export default page;
