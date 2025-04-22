import { Box } from "lucide-react";
import { CardTitle, CardHeader, CardDescription } from "@/components/ui/card";

interface ProductHeaderProps {
  name: string;
  type: string;
  children?: React.ReactNode; // For action buttons
}

// Displays the product name with an icon and optional actions
const ProductHeader: React.FC<ProductHeaderProps> = ({ name, type, children }) => (
  <CardHeader className="p-4 md:p-6 bg-gradient-to-r from-muted/60 via-white/80 to-muted/40 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow-sm rounded-t-lg">
    <div className="flex items-center gap-4">
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Box className="h-7 w-7 text-primary" />
        {type === "offer" && (
          <span className="absolute -top-1 -right-1 px-2 py-0.5 text-xs rounded-full bg-yellow-400 text-black font-bold animate-pulse shadow">عرض</span>
        )}
        {type === "company" && (
          <span className="absolute -top-1 -right-1 px-2 py-0.5 text-xs rounded-full bg-blue-500 text-white font-bold shadow">شركة</span>
        )}
      </span>
      <div className="flex flex-col gap-0.5">
        <CardTitle className="text-2xl md:text-3xl font-extrabold tracking-tight line-clamp-1 text-foreground drop-shadow-sm">
          {name}
        </CardTitle>
        <CardDescription className="text-sm md:text-base text-muted-foreground font-medium">
          {type === "offer"
            ? "منتج عرض خاص"
            : type === "company"
            ? "منتج من شركة"
            : "منتج عادي"}
        </CardDescription>
      </div>
    </div>
   
  </CardHeader>
);

export default ProductHeader;
