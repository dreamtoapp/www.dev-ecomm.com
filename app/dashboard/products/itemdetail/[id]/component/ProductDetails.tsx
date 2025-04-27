"use client";
import React from "react";
import ProductPrice from "./ProductPrice";
import { CardContent } from "@/components/ui/card";
import ProductHeader from "./ProductHeader";
import ProductStatusBadges from "./ProductStatusBadges";
import ProductImagePreview from "./ProductImagePreview";
import UpdateProductDialog from "../../../components/UpdateProductDialog";
import ProductStatusControl from "./ProductStatusControl";

// fallback image config (inline, no import needed)
const fallbackImage = { src: "/fallback/fallback.webp" };

interface Product {
  id: string;
  name: string;
  price: number;
  size?: string | null;
  details?: string | null;
  imageUrl?: string | null;
  supplier?: { name: string, type: string };
  published: boolean;
  outOfStock: boolean;
  updatedAt: Date;
}

// --- Subcomponents ---
function ProductInfoSection({ product }: { product: Product }) {
  return (
    <div className="space-y-6 flex flex-col justify-between w-full">
      <ProductPrice price={product.price} />
      <ProductStatusBadges published={product.published} outOfStock={product.outOfStock} />
      <ProductMeta product={product} />
      {product.details && <ProductDescription details={product.details} />}
    </div>
  );
}

function ProductMeta({ product }: { product: Product }) {
  return (
    <div className="space-y-2">
      {/* Name */}
      <div className="flex justify-between">
        <span>اسم المنتج</span>
        <span className="font-medium">{product.name}</span>
      </div>
      {/* Size */}
      {product.size && (
        <div className="flex justify-between">
          <span>الحجم</span>
          <span className="font-medium">{product.size}</span>
        </div>
      )}
      {/* Supplier */}
      {product.supplier?.name && (
        <div className="flex justify-between">
          <span>المورد</span>
          <span className="font-medium">{product.supplier.name}</span>
        </div>
      )}
      {/* Last updated */}
      <div className="flex justify-between">
        <span>آخر تحديث</span>
        <span className="font-medium">
          {new Date(product.updatedAt).toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}

function ProductDescription({ details }: { details: string }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground">الوصف</h3>
      <p className="text-muted-foreground leading-relaxed">{details}</p>
    </div>
  );
}

// --- Main Component ---
export default function ProductDetails({ product }: { product: Product }) {


  // All publish/stock logic is now handled in ProductStatusControl

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 p-2 md:p-6">
      {/* Header with actions */}
      <ProductHeader name={product.supplier?.name || ""} type={product.supplier?.type || ""} />


      {/* Main Content Grid: image half, details half */}
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Image Section - left half on desktop */}
        <div className="flex items-center justify-center w-full flex-col">
          <ProductImagePreview src={product?.imageUrl || ""} alt={product.name} fallbackSrc={fallbackImage.src} />
          <div className="flex gap-2 flex-col mt-4">
            <UpdateProductDialog product={product} />
            <ProductStatusControl product={product} />
          </div>
        </div>
        {/* Info Section - right half on desktop */}
        <ProductInfoSection product={product} />
      </CardContent>
    </div>
  );
}
