// app/dashboard/suppliers/page.tsx
import SupplierCard from "./components/SupplierCard";
import AddSupplierDialog from "./components/AddSupplierDialog";
import { getSuppliers } from "./actions/supplierActions";

// Centralized UI text for localization
const UI_TEXT = {
  title: "الشركات",
  noSuppliers: "لا توجد شركات مضافة بعد.",
  addSupplier: "إضافة شركة",
  ariaLabel: {
    supplierCount: (count: number) => `عدد الشركات: ${count}`,
    addSupplier: "إضافة شركة",
  },
};

export default async function SuppliersPage() {
  // Fetch suppliers on the server side
  const suppliers = await getSuppliers();




  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* Enhanced Sticky Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm p-4 md:p-6">
        <div className="flex items-center justify-between">
          {/* Title and Count */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-foreground">
              {UI_TEXT.title}
            </h1>
            <span
              className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full bg-primary text-primary-foreground shadow-md transition-colors"
              aria-label={UI_TEXT.ariaLabel.supplierCount(suppliers.length)}
            >
              {suppliers.length}
            </span>
          </div>

          {/* Add Supplier Button */}
          <AddSupplierDialog aria-label={UI_TEXT.ariaLabel.addSupplier} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* Display Suppliers as Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {suppliers.length > 0 ? (
            suppliers.map((supplier: any) => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))
          ) : (
            <div
              className="col-span-full text-center text-muted-foreground"
              aria-live="polite"
            >
              {UI_TEXT.noSuppliers}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
