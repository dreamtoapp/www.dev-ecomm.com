// components/LoadingSkeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';

export default function LoadingSkeleton() {
  return (
    <div className="container mx-auto bg-background text-foreground px-4 sm:px-6 lg:px-8">
      {/* Offer Section Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-12 w-1/3 mx-auto sm:w-1/4 lg:w-1/5" /> {/* Title */}
        <Skeleton className="h-48 w-full rounded-lg sm:h-64 lg:h-72" /> {/* Image */}
      </div>

      {/* Product Category Skeleton */}
      <div className="space-y-4 mt-8">
        <div className="flex flex-wrap justify-center gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Product List Skeleton */}
      <div className="space-y-4 mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-40 w-full rounded-lg sm:h-48 lg:h-56" />
              <div className="space-y-2 px-2">
                <Skeleton className="h-4 w-3/4 mx-auto" /> {/* Product Name */}
                <Skeleton className="h-4 w-1/2 mx-auto" /> {/* Price */}
                <div className="flex justify-center gap-2 mt-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <Skeleton className="h-4 w-1/2 mx-auto" /> {/* Total Price */}
              </div>
              <Skeleton className="h-10 w-24 mx-auto rounded-full" /> {/* Button */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
