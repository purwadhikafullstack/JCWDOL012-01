import UserOrder from '@/components/listOrder/CustomerOrder';

const OrderPage = ({
  searchParams,
}: {
  searchParams?: {
    invoice?: string;
    status?: string;
    start_date?: string;
    end_date?: string;
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const invoice = searchParams?.invoice || '';
  const status = searchParams?.status || '';
  const startDate = searchParams?.start_date || '';
  const endDate = searchParams?.end_date || '';

  return (
    <div className=" bg-white flex flex-col p-5 gap-3 mt-5 w-full rounded-md h-fit">
      <p className="text-2xl font-semibold">Daftar Transaksi</p>
      <UserOrder
        invoice={invoice}
        currentPage={currentPage}
        status={status}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
};

export default OrderPage;
