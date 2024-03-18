'use client';

import useProduct from '@/hooks/useProduct';
import useCategories from '@/hooks/useCategories';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useFormik } from 'formik';
import { validateNewEvent } from '@/lib/validation';
import useCreateProduct from '@/hooks/useCreateProduct';
import { useEffect, useState } from 'react';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import EditImage from './EditImage';

export default function EditProduct({ id }: { id: string }) {
  const router = useRouter();
  const {
    data: productData,
    isLoading: productLoading,
    isError,
    refetch,
  } = useProduct({ id });

  const { data, isLoading } = useCategories();
  const { mutate, isPending } = useCreateProduct();
  const [removedFiles, setRemovedFiles] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState(productData?.results?.name);
  const [price, setPrice] = useState(productData?.results?.price);
  const [weight, setWeight] = useState(productData?.results?.weight);
  const [category, setCategory] = useState(
    productData?.results?.category?.name,
  );
  const [description, setDescription] = useState(
    productData?.results?.description,
  );
  console.log(removedFiles);

  const formik: any = useFormik({
    initialValues: {
      name: name,
      price: price,
      weight: weight,
      category: category,
      description: description,
    },
    validationSchema: validateNewEvent,
    onSubmit: ({ name, price, weight, category, description }) => {
      mutate(
        {
          name,
          price,
          weight,
          category,
          description,
          files: files,
        },
        {
          onSuccess: () => {
            toast({
              variant: 'success',
              title: 'Product created successfully !',
            });
            router.push('/dashboard/products');
          },
          onError: (res: any) => {
            toast({
              variant: 'destructive',
              title: 'Failed to create product !',
              description: res?.response?.data?.message,
            });
          },
        },
      );
      // if (removedFiles) {

      // }
    },
  });

  useEffect(() => {
    if (!productLoading) {
      setName(productData?.results?.name);
      setPrice(productData?.results?.price);
      setWeight(productData?.results?.weight);
      setCategory(productData?.results?.category?.name);
      setDescription(productData?.results?.description);
    }
  }, [productData, productLoading]);

  if (productLoading) return <div>Loading...</div>;

  const product = productData?.results;

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="space-y-4">
        {/* image section */}
        <div>
          <div className="mb-2 font-semibold">Image</div>
          <div className="flex gap-2">
            <EditImage
              id="image-1"
              files={files}
              setFiles={setFiles}
              setRemovedFiles={setRemovedFiles}
              imageId={product.images[0]?.id}
              imageUrl={product.images[0] && `${product.images[0]?.url}`}
            />
            <EditImage
              id="image-2"
              files={files}
              setFiles={setFiles}
              setRemovedFiles={setRemovedFiles}
              imageId={product.images[1]?.id}
              imageUrl={product.images[1] && `${product.images[1]?.url}`}
            />
            <EditImage
              id="image-3"
              files={files}
              setFiles={setFiles}
              setRemovedFiles={setRemovedFiles}
              imageId={product.images[2]?.id}
              imageUrl={product.images[2] && `${product.images[2]?.url}`}
            />
            <EditImage
              id="image-4"
              files={files}
              setFiles={setFiles}
              setRemovedFiles={setRemovedFiles}
              imageId={product.images[3]?.id}
              imageUrl={product.images[3] && `${product.images[3]?.url}`}
            />
          </div>
        </div>
        {/* name */}
        <div>
          <div className="mb-2 font-semibold">Product Title</div>
          <Input
            name="name"
            type="text"
            className="border-slate-300"
            defaultValue={name}
            {...formik.getFieldProps('name')}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-xs text-red-500">{formik.errors.name}</div>
          ) : null}
        </div>

        {/* price */}
        <div>
          <div className="mb-2 font-semibold">Price</div>
          <Input
            name="price"
            type="number"
            placeholder="Rp."
            className="border-slate-300"
            defaultValue={price}
            {...formik.getFieldProps('price')}
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="text-xs text-red-500">{formik.errors.price}</div>
          ) : null}
        </div>

        {/* weight */}
        <div>
          <div className="mb-2 font-semibold">Weight</div>
          <Input
            name="weight"
            type="number"
            placeholder="grams."
            className="border-slate-300"
            defaultValue={weight}
            {...formik.getFieldProps('weight')}
          />
          {formik.touched.weight && formik.errors.weight ? (
            <div className="text-xs text-red-500">{formik.errors.weight}</div>
          ) : null}
        </div>

        {/* category */}
        <div>
          <div className="mb-2 font-semibold">Category</div>
          <Select
            onValueChange={(value) => {
              formik.setFieldValue('category', value);
            }}
            defaultValue={category}
            value={category}
          >
            <SelectTrigger className="text-slate-800 border-slate-300">
              {isLoading ? (
                <SelectValue placeholder="Fetching Categories" />
              ) : (
                <SelectValue placeholder="Choose a Category" />
              )}
            </SelectTrigger>
            <SelectContent>
              {data?.results?.map((category: any, i: number) => (
                <SelectItem key={i} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* description */}
        <div>
          <div className="mb-2 font-semibold">Description</div>
          <Textarea
            name="description"
            className="border-slate-300"
            defaultValue={description}
            {...formik.getFieldProps('description')}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-xs text-red-500">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        <Button disabled={isPending}>Update !</Button>
      </div>
    </form>
  );
}
