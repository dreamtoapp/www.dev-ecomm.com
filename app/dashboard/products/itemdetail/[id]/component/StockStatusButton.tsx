"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Package } from "lucide-react";
import { updateStockStatus } from "../actions";

interface StockStatusButtonProps {
  outOfStock: boolean;
  productName: string;
  productId: string;
  onStatusChange?: (outOfStock: boolean) => void;
}

export default function StockStatusButton({ outOfStock, productName, productId, onStatusChange }: StockStatusButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    const nextStatus: boolean = !outOfStock;
    try {
      const res = await updateStockStatus(productId, nextStatus);
      if (res && typeof res.outOfStock === "boolean") {
        onStatusChange?.(res.outOfStock);
        setOpen(false);
      } else {
        setError((res && res.error) || "حدث خطأ غير متوقع");
      }
    } catch (e) {
      setError("فشل الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={outOfStock ? "default" : "secondary"}
          className="h-10 gap-2 transition-all hover:bg-primary/20"
        >
          <Package className="h-4 w-4" />
          {outOfStock ? "إعادة التخزين" : "تعديل المخزون"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {outOfStock ? "تأكيد إعادة المخزون" : "تأكيد نفاد المخزون"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {outOfStock ? (
              <>سيتم إعادة المنتج <span className="font-bold">{productName}</span> إلى المخزون وسيكون متاحاً للطلب.</>
            ) : (
              <>سيتم وضع المنتج <span className="font-bold">{productName}</span> كغير متوفر في المخزون ولن يتمكن العملاء من طلبه.</>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "...جاري التنفيذ" : outOfStock ? "تأكيد الإعادة" : "تأكيد التعديل"}
          </AlertDialogAction>
        </AlertDialogFooter>
        {error && <div className="text-destructive text-sm mt-2">{error}</div>}
      </AlertDialogContent>
    </AlertDialog>
  );
}
