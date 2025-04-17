"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "@/components/link";
import CardImage from "../../../../components/CardImage"; // Import the enhanced CardImage component
import { Badge } from "@/components/ui/badge"; // Import a badge component for the product count
import MoreAction from "./MoreAction"; // Import the MoreAction dropdown
import React from "react";

interface SupplierCardProps {
  supplier: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    type: string;
    logo: string | null; // Logo URL (optional)
    publicId: string | null; // Public ID (optional)
    productCount: number; // Number of products associated with the supplier
  };
}

// Centralized UI text for localization
const UI_TEXT = {
  products: (count: number) => (count > 0 ? `${count} منتج` : "لا توجد منتجات"),
  manageProducts: "إدارة المنتجات",
  addProduct: "إضافة منتج",
  noLogo: "لا يوجد شعار",
  ariaLabel: {
    productCount: (count: number) => `عدد المنتجات: ${count}`,
    manageProducts: "إدارة المنتجات",
    addProduct: "إضافة منتج",
  },
};

const SupplierCard: React.FC<SupplierCardProps> = React.memo(({ supplier }) => {
  return (
    <Card className="rounded-lg border border-border bg-background shadow-sm h-full rtl hover:shadow-md transition-shadow duration-200">
      {/* Card Header */}
      <CardHeader className="flex flex-col justify-between items-start p-4 border-b border-border">
        {supplier.type === "offer" ? <div className="font-semibold text-foreground bg-green-300 w-full rounded-md flex items-center justify-center p-2">عرض</div> : <div className="font-semibold text-foreground bg-blue-200 w-full rounded-md flex items-center justify-center p-2">شركة</div>}

        <div className="flex items-center justify-between w-full">
          {/* Product Count Badge */}
          <Badge
            variant={supplier.productCount > 0 ? "outline" : "secondary"}
            className={`rounded-xl text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${supplier.productCount > 0
              ? "bg-secondary text-secondary-foreground"
              : "bg-destructive/70 text-white"
              }`}
            aria-label={UI_TEXT.ariaLabel.productCount(supplier.productCount)}
          >
            {UI_TEXT.products(supplier.productCount)}
          </Badge>

          {/* More Actions Dropdown */}
          <MoreAction supplier={supplier} />
        </div>

        {/* Supplier Name */}
        <CardTitle className="font-semibold text-foreground mt-2">
          {supplier.name}
        </CardTitle>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-4 flex-grow space-y-4">
        {/* Supplier Logo */}
        <div className="flex justify-center">
          <CardImage
            imageUrl={supplier.logo || undefined} // Pass undefined if no logo is available
            altText={`شعار ${supplier.name}`}
            aspectRatio="square" // Use a square aspect ratio for the logo
            fallbackSrc="/default-logo.png" // Default fallback image
            placeholderText={UI_TEXT.noLogo} // Custom placeholder text
            width="120px"
            priority={false} // Lazy load the image
          />
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-4 flex justify-between items-center border-t border-border">
        {/* Manage/Add Products Button */}
        {supplier.type === "company" && (
          <Link
            href={`/dashboard/products?supplierId=${supplier.id}`}
            className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${supplier.productCount > 0
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-green-600 text-white hover:bg-green-700"
              }`}
            aria-label={
              supplier.productCount > 0
                ? UI_TEXT.ariaLabel.manageProducts
                : UI_TEXT.ariaLabel.addProduct
            }
            role="button"
          >
            {supplier.productCount > 0
              ? UI_TEXT.manageProducts
              : UI_TEXT.addProduct}
          </Link>
        )}
      </CardFooter>
    </Card>
  );
});

SupplierCard.displayName = "SupplierCard"; // Add display name for React.memo
export default SupplierCard;
