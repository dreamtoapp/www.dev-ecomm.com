import {
  Card,
  CardContent,
} from "@/components/ui/card";
import CardImage from "../../../../components/CardImage";
import { Eye } from "lucide-react";
import Link from "@/components/link";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    size?: string | null;
    details?: string | null;
    imageUrl?: string | null;
    published: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="w-full border-b border-border rounded-none p-0 bg-card text-card-foreground hover:bg-muted/40 transition-colors group">
      <CardContent className="grid grid-cols-1 sm:grid-cols-[7rem_1fr_1fr_1fr_2fr_7rem] items-center gap-y-2 gap-x-2 p-2 sm:p-0 w-full min-h-[80px]">
        {/* Image Cell */}
        <div className="flex items-center justify-center w-full h-20 sm:h-16 bg-muted border-b sm:border-b-0 sm:border-r border-muted flex-shrink-0 rounded-md overflow-hidden">
          <CardImage
            imageUrl={product.imageUrl || undefined}
            altText={`${product.name} image`}
            aspectRatio="square"
            fallbackSrc="/default-product.jpg"
            placeholderText="لا توجد صورة متاحة"
            className="object-cover w-full h-full"
          />
        </div>
        {/* Name Cell */}
        <div className="font-bold text-primary text-base truncate text-center sm:text-right" title={product.name}>{product.name}</div>
        {/* Size Cell */}
        <div className="text-sm text-muted-foreground text-center">{product.size || <span className='text-destructive'>—</span>}</div>
        {/* Price Cell */}
        <div className="text-base font-bold text-primary text-center">{product.price.toLocaleString("ar-EG", { style: "currency", currency: "USD" })}</div>
        {/* Details Cell */}
        <div className="text-xs text-muted-foreground line-clamp-2 w-full text-center sm:text-right" title={product.details || undefined}>{product.details || <span className='text-destructive'>لا توجد تفاصيل</span>}</div>
        {/* Published Status Cell */}
        <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center">
          {product.published ? (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-green-700 bg-green-100 text-xs font-semibold">
              منشور
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-red-700 bg-red-100 text-xs font-semibold">
              غير منشور
            </span>
          )}
        </div>
        {/* Action Cell */}
        <div className="flex items-center justify-center w-full">
          <Link
            href={`/dashboard/porductmangment/itemdetail/${product.id}`}
            className="flex items-center gap-1 px-2 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/80 transition-colors text-xs font-semibold shadow-sm  justify-center"
            aria-label="عرض التفاصيل"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">التفاصيل</span>
          </Link>
        </div>
        </div>
      </CardContent>
    </Card>
  );
}
