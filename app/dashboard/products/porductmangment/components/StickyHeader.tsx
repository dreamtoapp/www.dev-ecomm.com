import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Package } from "lucide-react";
import ProductCountBadge from "./ProductCountBadge";
import FilterSection from "./FilterSection";

interface StickyHeaderProps {
  suppliers: any[];
  productCount: number;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({
  suppliers,
  productCount,
}) => {
  console.log(suppliers)
  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm">
      <Card className="rounded-none border-x-0 border-t-0 shadow-none">
        <CardContent className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4  ">
          {/* Filter Section */}
          <FilterSection suppliers={suppliers} />



          {/* Product Count Badge */}
          <ProductCountBadge productCount={productCount} />
        </CardContent>
      </Card>
    </div>
  );
};

export default StickyHeader;
