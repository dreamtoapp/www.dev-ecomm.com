const ProductSkeleton = ({ count }: { count: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="rounded-2xl shadow-md overflow-hidden relative bg-card border border-border animate-pulse"
      >
        <div className="w-full h-40 bg-muted rounded-t-2xl"></div>
        <div className="space-y-2 p-4 text-center">
          <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-muted rounded w-1/2 mx-auto mt-2"></div>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-8 h-8 bg-muted rounded-full"></div>
            <div className="w-8 h-8 bg-muted rounded-full"></div>
          </div>
          <div className="mt-2 bg-muted p-2 rounded-lg shadow-sm">
            <div className="h-4 bg-muted-foreground/20 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
        <div className="p-4 flex justify-center items-center">
          <div className="w-24 h-10 bg-muted rounded-full"></div>
        </div>
      </div>
    ))}
  </div>
);
export default ProductSkeleton;
