import EmptyBox from '@/components/empty-box';
import { Badge } from '@/components/ui/badge';
import AddOffer from './components/AddOffer';
import OfferCard from './components/offer-card';
import { getOfferCount  } from '@/app/dashboard/offer/actions';

export default async function OfferPage() {
  const suppliers = await getOfferCount();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Enhanced Sticky Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border shadow-sm p-4 md:p-6">
        <div className="flex items-center justify-between">
          {/* Title and Count */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-foreground">
              العروض الترويجية
            </h1>
            <Badge variant="destructive" className="shadow-md">
              {suppliers.length}
            </Badge>
          </div>

          {/* Add Supplier Button */}
          <AddOffer aria-label="إضافة شركة" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 space-y-6">
        {/* Display Suppliers as Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
          {suppliers.length > 0 ? (
            suppliers.map((supplier: any) => (
              <OfferCard supplier={supplier} key={supplier.id} />
            ))
          ) : (
            <EmptyBox
              title="لا توجد عروض مضافة بعد"
              description="ابدأ بإضافة العروض باستخدام الزر أعلاه."
            />
          )}
        </div>
      </main>
    </div>
  );
}
