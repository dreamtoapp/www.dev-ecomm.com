"use client"; // Mark as a Client Component
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import CardImage from "../../../../components/CardImage"; // Import the enhanced CardImage component
import EditProductDialog from "./EditProductDialog";
import { Eye } from "lucide-react"; // Import icons for delete and view transactions
import Link from "@/components/link";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    size?: string | null; // Optional field
    details?: string | null; // Optional field for product details
    imageUrl?: string | null; // Optional field
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden border border-border bg-card text-card-foreground">
      {/* Card Header */}
      <CardHeader className="p-4 flex justify-between items-center border-b border-border">
        <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-4 space-y-4">
        {/* Image */}
        <CardImage
          imageUrl={product.imageUrl || undefined} // Pass undefined if no image is available
          altText={`${product.name} image`}
          aspectRatio="square" // Use a square aspect ratio for product images
          fallbackSrc="/default-product.jpg" // Default fallback image
          placeholderText="لا توجد صورة متاحة" // Custom placeholder text in Arabic
        />

        {/* Details */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            <strong>السعر:</strong> ${product.price.toFixed(2)}
          </p>
          {product.size && (
            <p className="text-sm text-muted-foreground">
              <strong>الحجم:</strong> {product.size}
            </p>
          )}
          {product.details ? (
            <p className="text-sm text-muted-foreground">
              <strong>التفاصيل:</strong> {product.details}
            </p>
          ) : (
            <p className="text-sm text-destructive">لا توجد تفاصيل متاحة</p>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 flex justify-between items-center border-t border-border bg-card">
        {/* <EditProductDialog product={product} /> */}
        <Link
          href={`/dashboard/porductmangment/itemdetail/${product.id}`}
          className="flex bg-primary w-full items-center justify-center gap-2   hover:bg-primary/10 p-2 rounded-md text-primary-foreground transition-colors"
          aria-label="عرض التفاصيل"
          onClick={() => console.log("View product details:", product.id)}
        >
          <Eye className="h-4 w-4" />
          <span className="truncate">عرض التفاصيل</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
