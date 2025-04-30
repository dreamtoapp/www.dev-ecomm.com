import { getInventory } from './actions/getInventory';
import { InventoryTable } from './components/InventoryTable';

export default async function InventoryReportPage() {
  const products = await getInventory();

  return (
    <div className="max-w-6xl mx-auto py-10 px-2 rtl text-right">
      <h1 className="text-3xl font-bold mb-6 text-primary">تقرير المخزون</h1>
      <InventoryTable products={products} />
    </div>
  );
}
