import ProductDetails from '@/components/product/ProductDetails';

type Props = {
  params: {
    storeId: string;
    productId: string;
  };
};

export default function ProductDetailPage({
  params: { storeId, productId },
}: Props) {
  return (
    <div className='bg-slate-100 mt-8 lg:mt-20'>
      <ProductDetails storeId={storeId} productId={productId} />
    </div>
  );
}
