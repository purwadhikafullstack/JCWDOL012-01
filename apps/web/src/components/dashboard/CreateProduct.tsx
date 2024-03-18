'use client';

import useCategories from '@/hooks/useCategories';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import Uploader from './Uploader';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { useFormik } from 'formik';
import { validateNewEvent } from '@/lib/validation';
import useCreateProduct from '@/hooks/useCreateProduct';
import { useState } from 'react';
import { toast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

export default function CreateProduct() {
  const { data, isLoading } = useCategories();
  const { mutate, isPending } = useCreateProduct();
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

  const formik: any = useFormik({
    initialValues: {
      name: '',
      price: 0,
      weight: 0,
      category: '',
      description: '',
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
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="space-y-4">
        {/* image section */}
        <div>
          <div className="mb-2 font-semibold">Image</div>
          <div className="flex gap-2">
            <Uploader id="image-1" files={files} setFiles={setFiles} />
            <Uploader id="image-2" files={files} setFiles={setFiles} />
            <Uploader id="image-3" files={files} setFiles={setFiles} />
            <Uploader id="image-4" files={files} setFiles={setFiles} />
          </div>
        </div>
        {/* name */}
        <div>
          <div className="mb-2 font-semibold">Product Title</div>
          <Input
            name="name"
            type="text"
            className="border-slate-300"
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
              // formik.setFieldValue('categoryId', value);
              formik.setFieldValue('category', value);
            }}
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
            {...formik.getFieldProps('description')}
          />
          {formik.touched.description && formik.errors.description ? (
            <div className="text-xs text-red-500">
              {formik.errors.description}
            </div>
          ) : null}
        </div>
        <Button disabled={isPending}>Submit !</Button>
      </div>
    </form>
  );
}
