import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

function loading() {
  return (
    <div className="flex flex-col min-h-screen p-6">
      {/* Navigation Bar */}
      <header className="p-4 bg-gray-200">
        <Skeleton className="h-6 w-1/4" />
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-4 p-4">
        {/* Status Bar */}
        <div className="flex gap-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-10 w-32" />
          ))}
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-sm">
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default loading;
