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
    <>
      <ProductDetails storeId={storeId} productId={productId} />
    </>
  );
}
