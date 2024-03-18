type Props = {
  params: {
    storeId: string;
  };
};

export default function StoreInventoryDashboard({
  params: { storeId },
}: Props) {
  return <>{storeId}</>;
}
