"use client";

import { useState } from 'react';

import Image from 'next/image';

import RatingPreview from '@/components/rating/RatingPreview';
import { Badge } from '@/components/ui/badge';
import WishlistButton from '@/components/wishlist/WishlistButton';
import { cn } from '@/lib/utils';
import Link from '../link';

interface Product {
  id: string;
  name: string;
  slug?: string;
  price: number;
  salePrice?: number | null;
  imageUrl: string;
  rating?: number | null;
  reviewCount?: number | null;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(product.imageUrl || "/fallback/product-fallback.avif");

  // Format price
  const formattedPrice = new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
  }).format(product.price);

  // Format sale price if available
  const formattedSalePrice = product.salePrice
    ? new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: "SAR",
    }).format(product.salePrice)
    : null;

  // Calculate discount percentage if there's a sale price
  const discountPercentage = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  // We'll use the RatingPreview component instead of custom rendering

  return (
    <div className={cn("group relative", className)}>
      {/* Wishlist button */}
      <div className="absolute top-2 left-2 z-10">
        <WishlistButton
          productId={product.id}
          size="sm"
          showBackground={true}
        />
      </div>

      {/* Product link */}
      <Link href={`/product/${product.slug || product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgSrc("/fallback/product-fallback.avif")}
          />

          {/* Sale badge */}
          {product.salePrice && (
            <Badge className="absolute top-2 right-2 bg-red-500">
              {discountPercentage}% خصم
            </Badge>
          )}

          {/* Stock badge */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="outline" className="bg-white text-black font-bold px-3 py-1">
                غير متوفر
              </Badge>
            </div>
          )}
        </div>

        <div className="mt-3 space-y-1">
          {/* Product name */}
          <h3 className="text-sm font-medium line-clamp-1">{product.name}</h3>

          {/* Rating */}
          {(product.rating && product.rating > 0) && (
            <RatingPreview
              productId={product.id}
              productSlug={product.slug}
              rating={product.rating}
              reviewCount={product.reviewCount || 0}
              size="sm"
              disableLink={true}
            />
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            {formattedSalePrice ? (
              <>
                <span className="text-sm font-bold text-primary">{formattedSalePrice}</span>
                <span className="text-xs text-muted-foreground line-through">{formattedPrice}</span>
              </>
            ) : (
              <span className="text-sm font-bold">{formattedPrice}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
