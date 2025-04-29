"use client";
export default function AnalyticsSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow p-6 min-h-[300px] animate-pulse flex flex-col gap-4">
      <div className="h-8 w-1/3 bg-muted rounded mb-2"></div>
      <div className="h-6 w-1/4 bg-muted rounded mb-2"></div>
      <div className="h-40 w-full bg-muted rounded"></div>
    </div>
  );
}
