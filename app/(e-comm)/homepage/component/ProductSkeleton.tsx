import { memo } from 'react';

// Optimized skeleton item component
const SkeletonItem = memo(() => (
  <div
    className="rounded-2xl shadow-md overflow-hidden relative bg-card border border-border animate-pulse flex flex-col"
    style={{
      contain: 'content',
      containIntrinsicSize: '500px',
      height: '500px'
    }}
  >
    {/* Image section - fixed height */}
    <div className="w-full h-48 bg-muted rounded-t-2xl"></div>

    {/* Content section - flex-grow to fill space */}
    <div className="flex-1 flex flex-col p-4 text-center">
      {/* Title */}
      <div className="h-5 bg-muted rounded w-3/4 mx-auto mb-1"></div>

      {/* Details */}
      <div className="h-10 bg-muted rounded w-1/2 mx-auto mt-2 mb-2"></div>

      {/* Spacer */}
      <div className="flex-grow min-h-[20px]"></div>

      {/* Price section */}
      <div className="flex justify-between items-center mt-3 mb-2">
        <div className="h-5 bg-muted rounded w-1/3"></div>
        <div className="h-5 bg-muted rounded w-1/3"></div>
      </div>

      {/* Quantity controls */}
      <div className="flex justify-center gap-2 mt-2">
        <div className="w-8 h-8 bg-muted rounded-full"></div>
        <div className="w-8 h-8 bg-muted rounded"></div>
        <div className="w-8 h-8 bg-muted rounded-full"></div>
      </div>
    </div>

    {/* Footer section - fixed height */}
    <div className="h-[80px] p-4 flex justify-center">
      <div className="w-32 h-10 bg-muted rounded-full"></div>
    </div>
  </div>
));

// Main skeleton component with performance optimizations
const ProductSkeleton = ({ count }: { count: number }) => (
  <div
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4"
    style={{
      contentVisibility: 'auto',
      containIntrinsicSize: '350px'
    }}
  >
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonItem key={index} />
    ))}
  </div>
);

export default memo(ProductSkeleton);
