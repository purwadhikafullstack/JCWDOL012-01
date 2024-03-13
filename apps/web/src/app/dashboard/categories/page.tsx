import { Category } from './column';
import { columns } from './column';
import { DataTable } from './data-table';

async function getData(): Promise<Category[]> {
  // Fetch data from your API here.
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/categories`,
    { method: 'GET', cache: 'no-cache' },
  );
  const { results: categories } = await res.json();

  console.log(categories);
  return categories.map((category: any) => ({
    id: category.id,
    name: category.name,
    totalProduct: category?.products?.length,
  }));
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
