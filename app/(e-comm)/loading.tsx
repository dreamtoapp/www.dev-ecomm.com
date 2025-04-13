// components/LoadingSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="container mx-auto bg-background text-foreground">
      {/* Offer Section Skeleton (Full-width Image) */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-1/4 mx-auto" /> {/* Title Placeholder */}
        <Skeleton className="h-64 w-full rounded-2xl" />{" "}
        {/* Image Placeholder */}
      </div>

      {/* Product Category Skeleton */}
      <div className="space-y-4 mt-8 w-full items-center justify-center">
        <div className="w-full h-full flex flex-row gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="w-full h-full space-y-4">
              <Skeleton className="h-20 w-20 rounded" />{" "}
            </div>
          ))}
        </div>
      </div>

      {/* Product List Skeleton */}
      <div className="space-y-4 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-40 w-full rounded-t-2xl" />{" "}
              {/* Image Placeholder */}
              <div className="space-y-2 p-4 text-center">
                <Skeleton className="h-4 w-3/4 mx-auto" />{" "}
                {/* Product Name Placeholder */}
                <Skeleton className="h-4 w-1/2 mx-auto" />{" "}
                {/* Price Placeholder */}
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Skeleton className="h-8 w-8 rounded-full" />{" "}
                  {/* Quantity Button Placeholder */}
                  <Skeleton className="h-8 w-8 rounded-full" />{" "}
                  {/* Quantity Button Placeholder */}
                </div>
                <Skeleton className="h-4 w-1/2 mx-auto" />{" "}
                {/* Total Price Placeholder */}
              </div>
              <Skeleton className="h-10 w-24 mx-auto rounded-full" />{" "}
              {/* Add to Cart Button Placeholder */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
