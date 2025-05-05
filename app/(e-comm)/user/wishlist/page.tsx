import { redirect } from "next/navigation";
import { Heart } from "lucide-react";
import { auth } from "@/auth";
import { getUserWishlist } from "@/app/(e-comm)/product/actions/wishlist";
import ProductCard from "@/components/product/ProductCard";

export const metadata = {
  title: "المفضلة | المتجر الإلكتروني",
  description: "عرض المنتجات المفضلة لديك",
};

export default async function WishlistPage() {
  // Get the current user
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect("/auth/login?redirect=/user/wishlist");
  }

  // Get the user's wishlist
  const wishlistProducts = await getUserWishlist();

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-full bg-red-100">
          <Heart className="h-6 w-6 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold">المفضلة</h1>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-lg shadow-sm">
          <Heart className="h-12 w-12 mx-auto text-red-400 mb-4" />
          <h2 className="text-xl font-medium mb-2">لا توجد منتجات في المفضلة</h2>
          <p className="text-muted-foreground mb-6">
            لم تقم بإضافة أي منتجات إلى المفضلة بعد. تصفح المتجر وأضف المنتجات التي تعجبك!
          </p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            تصفح المنتجات
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
