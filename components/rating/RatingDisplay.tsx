"use client";

import {
  Star,
  StarHalf,
} from 'lucide-react';

import { cn } from '@/lib/utils';

import RatingPreview from './RatingPreview';

interface RatingDisplayProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  className?: string;
  productId?: string; // Optional product ID for linking to product page
  productSlug?: string; // Optional product slug for SEO-friendly URLs
}

export default function RatingDisplay({
  rating,
  reviewCount = 0,
  size = "md",
  showCount = true,
  className,
  productId,
  productSlug,
}: RatingDisplayProps) {
  // Ensure rating is between 0 and 5
  const safeRating = Math.max(0, Math.min(5, rating));

  // Calculate full and partial stars
  const fullStars = Math.floor(safeRating);
  const hasHalfStar = safeRating % 1 >= 0.5;

  // Determine star size based on prop
  const starSize = {
    sm: 14,
    md: 16,
    lg: 20,
  }[size];

  // Determine text size based on prop
  const textSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }[size];

  // If productId is provided, use RatingPreview component for clickable ratings
  if (productId) {
    return (
      <RatingPreview
        productId={productId}
        productSlug={productSlug}
        rating={rating}
        reviewCount={showCount ? reviewCount : 0}
        size={size === "lg" ? "md" : "sm"}
        className={className}
        disableLink={false} // Allow linking since this is a standalone rating display
      />
    );
  }

  // Otherwise, use the standard display
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            size={starSize}
            className="fill-amber-400 text-amber-400"
          />
        ))}

        {/* Half star if needed */}
        {hasHalfStar && (
          <StarHalf
            key="half"
            size={starSize}
            className="fill-amber-400 text-amber-400"
          />
        )}

        {/* Empty stars */}
        {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={starSize}
            className="text-gray-300"
          />
        ))}
      </div>

      {showCount && (
        <span className={cn("text-muted-foreground", textSize)}>
          {safeRating.toFixed(1)} ({reviewCount})
        </span>
      )}
    </div>
  );
}
