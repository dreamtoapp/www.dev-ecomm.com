import React from 'react';

import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function loading() {
  return (
    <div className="max-w-3xl mx-auto my-10 bg-white p-6 shadow-md rounded-md">
      {/* Skeleton Loader */}
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48 mb-2" /> {/* Invoice Title */}
          <Skeleton className="h-4 w-32" /> {/* Subtitle */}
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Customer Details Skeleton */}
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          {/* Table Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" /> {/* Table Header */}
            <Skeleton className="h-8 w-full" /> {/* Table Row */}
            <Skeleton className="h-8 w-full" /> {/* Table Row */}
            <Skeleton className="h-8 w-full" /> {/* Table Row */}
          </div>
          {/* Summary Skeleton */}
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-8 w-32" /> {/* Total Amount */}
          {/* Buttons Skeleton */}
          <div className="flex justify-between mt-6">
            <Skeleton className="h-20 w-20" /> {/* QR Code */}
            <div className="space-y-2">
              <Skeleton className="h-10 w-40" /> {/* Download Button */}
              <Skeleton className="h-10 w-40" /> {/* Email Button */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default loading
