"use client";
import React from "react";

export default function ProductInfo({ product }: { product: any }) {
  if (!product) return null;
  return (
    <div className="flex items-center gap-3 border border-muted bg-white rounded-lg px-3 py-1 shadow-sm">
      {product.imageUrl && (
        <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded object-cover border" />
      )}
      <div className="flex flex-col">
        <span className="font-semibold text-primary text-lg">{product.name}</span>
        <span className="text-xs text-muted-foreground">ID: {product.id}</span>
        {product.price && (
          <span className="text-xs text-muted-foreground">السعر: {product.price} ريال</span>
        )}
        {product.category && (
          <span className="text-xs text-muted-foreground">التصنيف: {product.category}</span>
        )}
        {product.supplier && (
          <span className="text-xs text-muted-foreground">المورد: {product.supplier}</span>
        )}
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded ${product.outOfStock ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
        {product.outOfStock ? 'غير متوفر' : 'متوفر'}
      </span>
    </div>
  );
}
