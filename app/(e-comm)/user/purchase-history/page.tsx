import {
  ShoppingBag,
  Star,
} from 'lucide-react';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';

import { getUserPurchaseHistory } from './actions';
import PurchaseHistoryList from './components/PurchaseHistoryList';

export const metadata = {
  title: "سجل المشتريات | المتجر الإلكتروني",
  description: "عرض سجل مشترياتك السابقة وتقييم المنتجات التي اشتريتها",
};

export default async function PurchaseHistoryPage() {
  // Get the current user
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect("/auth/login?redirect=/user/purchase-history");
  }

  // Get the user's purchase history
  const userId = session.user.id;
  if (!userId) {
    redirect("/auth/login?redirect=/user/purchase-history");
  }
  const purchaseHistory = await getUserPurchaseHistory(userId);

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-full bg-primary/10">
          <ShoppingBag className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">سجل المشتريات</h1>
      </div>

      {purchaseHistory.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">لا توجد مشتريات سابقة</h2>
          <p className="text-muted-foreground mb-6">
            لم تقم بشراء أي منتجات بعد. تصفح المتجر واستمتع بالتسوق!
          </p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            تصفح المنتجات
          </a>
        </div>
      ) : (
        <>
          <div className="bg-muted/20 p-4 rounded-lg mb-6 flex items-center gap-3">
            <Star className="h-5 w-5 text-amber-500" />
            <p className="text-sm">
              يمكنك تقييم المنتجات التي اشتريتها لمساعدة المتسوقين الآخرين
            </p>
          </div>

          <PurchaseHistoryList purchases={purchaseHistory} />
        </>
      )}
    </div>
  );
}
