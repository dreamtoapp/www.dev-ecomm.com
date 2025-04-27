import { Badge } from "@/components/ui/badge";

interface ProductStatusBadgesProps {
  published: boolean;
  outOfStock: boolean;
}

// Shows status badges for published and stock status
const ProductStatusBadges: React.FC<ProductStatusBadgesProps> = ({ published, outOfStock }) => (
  <div className="flex flex-wrap gap-2 mt-2">
    <Badge variant={published ? "default" : "secondary"} className="gap-2 py-1.5 px-3 rounded-lg text-foreground bg-background border border-border">
      {published ? "منشور" : "غير منشور"}
    </Badge>
    <Badge variant={outOfStock ? "destructive" : "default"} className="gap-2 py-1.5 px-3 rounded-lg text-destructive bg-background border border-border">
      {outOfStock ? "غير متوفر" : "متوفر"}
    </Badge>
  </div>
);

export default ProductStatusBadges;
