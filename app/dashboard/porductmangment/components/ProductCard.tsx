"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Package } from "lucide-react";
import CardImage from "../../../../components/CardImage";
import Link from "@/components/link";

// Arabic UI Texts
const UI_TEXT = {
  viewDetails: "عرض التفاصيل",
  noImage: "لا توجد صورة",
  price: "السعر",
  size: "الحجم",
  details: "التفاصيل",
  inStock: "متوفر",
  outOfStock: "غير متوفر",
  lowStock: "كمية محدودة",
  lastUpdated: "آخر تحديث",
};

interface SupplierInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    size?: string | null;
    details?: string | null;
    imageUrl?: string | null;
    supplier?: SupplierInfo | null;
    stockStatus?: "in_stock" | "out_of_stock" | "low_stock";
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleEdit = () => console.log("Edit product:", product.id);
  const handleDelete = () => console.log("Delete product:", product.id);
  const handleMarkOutOfStock = () =>
    console.log("Mark product as out of stock:", product.id);
  const handleSuspendItem = () => console.log("Suspend item:", product.id);

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden border border-border bg-background flex flex-col h-full hover:-translate-y-1">
      {/* Card Header */}
      <CardHeader className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border space-y-2">
        {/* Product Title */}
        <CardTitle className="text-xl font-bold text-primary line-clamp-2">
          {product.name}
        </CardTitle>

        {/* Supplier Info */}
        {product.supplier && (
          <CardDescription className="text-sm text-muted-foreground flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="truncate">{product.supplier.name}</span>
          </CardDescription>
        )}

        {/* Stock and Published Status */}
        <div className="flex justify-between items-center">
          {product.stockStatus && (
            <Badge
              variant={
                product.stockStatus === "in_stock"
                  ? "default"
                  : product.stockStatus === "low_stock"
                    ? "secondary"
                    : "destructive"
              }
              className="w-fit"
            >
              {product.stockStatus === "in_stock"
                ? UI_TEXT.inStock
                : product.stockStatus === "low_stock"
                  ? UI_TEXT.lowStock
                  : UI_TEXT.outOfStock}
            </Badge>
          )}
          <Badge
            variant={product.published ? "default" : "destructive"}
            className="w-fit"
          >
            {product.published ? "منشور" : "غير منشور"}
          </Badge>
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-6 space-y-6 flex-grow">
        {/* Product Image */}
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
          <CardImage
            imageUrl={product.imageUrl}
            altText={`${product.name} image`}
            aspectRatio="square"
            fallbackSrc="/default-logo.png"
            placeholderText={UI_TEXT.noImage}
            priority={true}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <strong className="text-primary font-semibold">
              {UI_TEXT.price}:
            </strong>
            <span className="text-foreground text-lg font-bold">
              ${product.price.toFixed(2)}
            </span>
          </div>
          {product.size && (
            <div className="flex items-center gap-2">
              <strong className="text-primary font-semibold">
                {UI_TEXT.size}:
              </strong>
              <span className="text-foreground">{product.size}</span>
            </div>
          )}
          {product.details && (
            <div className="flex flex-col gap-2">
              <strong className="text-primary font-semibold">
                {UI_TEXT.details}:
              </strong>
              <p className="text-muted-foreground line-clamp-3">
                {product.details}
              </p>
            </div>
          )}
          <div className="flex items-center gap-2">
            <strong className="text-muted-foreground">
              {UI_TEXT.lastUpdated}:
            </strong>
            <span>{new Date(product.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-6 bg-muted/10 border-t border-border flex justify-between items-center">
        <Link
          href={`/dashboard/porductmangment/itemdetail/${product.id}`}
          className="flex bg-primary w-full items-center justify-center gap-2   hover:bg-primary/10 p-2 rounded-md text-primary-foreground transition-colors"
          aria-label={UI_TEXT.viewDetails}

        >
          <Eye className="h-4 w-4" />
          <span className="truncate">{UI_TEXT.viewDetails}</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
