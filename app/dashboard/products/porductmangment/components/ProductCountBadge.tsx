import React from "react";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

interface ProductCountBadgeProps {
  productCount: number;
}

const ProductCountBadge: React.FC<ProductCountBadgeProps> = ({
  productCount,
}) => {
  return (
    <Badge
      variant="outline"
      className="px-5 py-3 text-lg font-semibold border-primary text-primary flex items-center gap-2 hover:bg-primary/10 transition-colors"
    >
      <Package className="h-5 w-5" /> عدد المنتجات: {productCount}
    </Badge>
  );
};

export default ProductCountBadge;
