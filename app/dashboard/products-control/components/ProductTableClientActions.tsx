"use client";
import UpdateProductDialog from "../../products/components/UpdateProductDialog";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  price: number;
  size?: string;
  details?: string;
  imageUrl?: string;
  supplier?: { id: string; name: string };
  published: boolean;
  outOfStock: boolean;
}

export default function ProductTableClientActions({ product }: { product: Product }) {
  function handleDeleteProduct() {
    if (confirm("هل أنت متأكد من حذف المنتج؟")) {
      // TODO: Connect to server action
    }
  }
  return (
    <div className="flex gap-2">
      <UpdateProductDialog product={product} />
      <Button variant="destructive" size="icon" title="حذف المنتج" onClick={handleDeleteProduct}>
        <span className="sr-only">حذف</span>🗑️
      </Button>
    </div>
  );
}
