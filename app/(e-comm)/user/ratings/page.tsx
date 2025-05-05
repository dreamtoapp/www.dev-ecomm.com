import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import RatingDisplay from '@/components/rating/RatingDisplay';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import { getUserReviews } from '../../product/actions/rating';
import Link from '@/components/link';

export const metadata = {
  title: "تقييماتي | المتجر الإلكتروني",
  description: "عرض تقييماتك للمنتجات",
};

export default async function UserRatingsPage() {
  // Get the current user
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect("/auth/login?redirect=/user/ratings");
  }

  // Get the user's reviews
  const userId = session.user.id;
  if (!userId) {
    redirect("/auth/login?redirect=/user/ratings");
  }
  const reviews = await getUserReviews(userId);

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-full bg-amber-100">
          <Star className="h-6 w-6 text-amber-500" />
        </div>
        <h1 className="text-2xl font-bold">تقييماتي</h1>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg shadow-sm">
          <Star className="h-12 w-12 mx-auto text-amber-400 mb-4" />
          <h2 className="text-xl font-medium mb-2">لا توجد تقييمات</h2>
          <p className="text-muted-foreground mb-6">
            لم تقم بتقييم أي منتجات بعد. يمكنك تقييم المنتجات التي اشتريتها من صفحة سجل المشتريات.
          </p>
          <Link
            href="/user/purchase-history"
            className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            سجل المشتريات
          </Link>
        </div>
      ) : (
        <div className="space-y-6 bg-card rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium mb-4">تقييماتك ({reviews.length})</h2>
          <Separator />

          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-border last:border-0 last:pb-0">
                <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={review.product?.imageUrl || "/fallback/product-fallback.avif"}
                    alt={review.product?.name || "منتج"}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h3 className="font-medium">
                      <Link href={`/product/${review.product?.slug || review.productId}`} className="hover:underline">
                        {review.product?.name || "منتج غير متوفر"}
                      </Link>
                    </h3>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(review.createdAt), "d MMMM yyyy", { locale: ar })}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 my-2">
                    <RatingDisplay rating={review.rating} showCount={false} size="sm" />
                    <Badge variant="outline" className={review.isVerified ? "bg-green-100 text-green-800 border-green-300" : "bg-amber-100 text-amber-800 border-amber-300"}>
                      {review.isVerified ? "مشتري مؤكد" : "غير مؤكد"}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mt-2">{review.comment}</p>

                  <div className="mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-primary border-primary/20 hover:bg-primary/10"
                      asChild
                    >
                      <Link href={`/product/${review.product?.slug || review.productId}`}>
                        عرض المنتج
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
