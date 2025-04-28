"use client";
import UpdateProductDialog from "../../products/components/UpdateProductDialog";
import { Button } from "@/components/ui/button";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { toast } from "sonner";
import { deleteProduct } from "../actions/deleteProduct";

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

export default function ProductTableClientActions({ product, onDeleted }: { product: Product, onDeleted?: () => void }) {
  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(product.id);
      toast.success("تم حذف المنتج بنجاح.");
      if (onDeleted) onDeleted();
    } catch (err: any) {
      toast.error(err.message || "لا يمكن حذف المنتج. تحقق من عدم ارتباطه بمعاملات.");
    }
  };

  return (
    <div className="flex gap-2">
      <UpdateProductDialog product={product} />
      <ConfirmDeleteDialog onConfirm={handleDeleteProduct}>
        <Button variant="destructive" size="icon" title="حذف المنتج">
          <span className="sr-only">حذف</span>🗑️
        </Button>
      </ConfirmDeleteDialog>
    </div>
  );
}
