import CreateProduct from '@/components/dashboard/CreateProduct';

export default function CreateProductPage() {
  return (
    <div className="container mx-auto py-10 space-y-4">
      <span className='text-3xl font-extrabold'>Create New Product</span>
      <CreateProduct />
    </div>
  );
}
