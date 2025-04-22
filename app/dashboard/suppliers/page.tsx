import EmptyBox from '@/components/empty-box';
import { Badge } from '@/components/ui/badge';

import { getSuppliers } from './actions/get-supplier';
import AddSupplierDialog from './components/AddSupplierDialog';
import SupplierCard from './components/supplier-card';

export default async function SuppliersPage() {
  const suppliers = await getSuppliers();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Enhanced Sticky Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border shadow-sm p-4 md:p-6">
        <div className="flex items-center justify-between">
          {/* Title and Count */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-foreground">
              الشركات
            </h1>
            <Badge variant="destructive" className="shadow-md">
              {suppliers.length}
            </Badge>
          </div>

          {/* Add Supplier Button */}
          <AddSupplierDialog aria-label="إضافة شركة" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* Display Suppliers as Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
          {suppliers.length > 0 ? (
            suppliers.map((supplier: any) => (
              <SupplierCard supplier={supplier} key={supplier.id} />
            ))
          ) : (
            <EmptyBox
              title="لا توجد شركات مضافة بعد"
              description="ابدأ بإضافة الشركات باستخدام الزر أعلاه."
            />
          )}
        </div>
      </main>
    </div>
  );
}
