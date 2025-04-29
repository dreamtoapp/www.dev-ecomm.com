"use client";
import UpdateProductDialog from "../../products/components/UpdateProductDialog";
import { Button } from "@/components/ui/button";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { toast } from "sonner";
import { deleteProduct } from "../actions/deleteProduct";
import { BarChart2 } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(product.id);
      toast.success("تم حذف المنتج بنجاح.");
      if (onDeleted) onDeleted();
    } catch (err: any) {
      toast.error(err.message || "لا يمكن حذف المنتج. تحقق من عدم ارتباطه بمعاملات.");
    }
  };
  const handleAnalytics = () => {
    router.push(`/dashboard/products-control/analytics/${product.id}`);
  };
  return (
    <div className="flex gap-2">
      <UpdateProductDialog product={product} />
      <Button variant="secondary" size="icon" title="عرض التحليلات" onClick={handleAnalytics}>
        <BarChart2 className="w-5 h-5" />
        <span className="sr-only">تحليلات</span>
      </Button>
      <ConfirmDeleteDialog onConfirm={handleDeleteProduct}>
        <Button variant="destructive" size="icon" title="حذف المنتج">
          <span className="sr-only">حذف</span>🗑️
        </Button>
      </ConfirmDeleteDialog>
    </div>
  );
}
