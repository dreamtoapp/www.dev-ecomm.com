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
import { CheckCircle, XCircle } from "lucide-react";
import { updatePublishStatus } from "../actions";

interface PublishStatusButtonProps {
  published: boolean;
  productName: string;
  productId: string;
  onStatusChange?: (publish: boolean) => void;
}

export default function PublishStatusButton({ published, productName, productId, onStatusChange }: PublishStatusButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    const nextStatus: boolean = !published;
    try {
      const res = await updatePublishStatus(productId, nextStatus);
      if (res && typeof res.published === "boolean") {
        onStatusChange?.(res.published);
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
          variant={published ? "destructive" : "outline"}
          className="h-10 gap-2 transition-all hover:bg-primary/20"
        >
          {published ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
          {published ? "إيقاف النشر" : "نشر"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {published ? "تأكيد إيقاف النشر" : "تأكيد نشر المنتج"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {published ? (
              <>سيتم إيقاف نشر المنتج <span className="font-bold">{productName}</span> ولن يظهر للزبائن بعد الآن.</>
            ) : (
              <>سيتم نشر المنتج <span className="font-bold">{productName}</span> ليكون متاحاً للزبائن.</>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "...جاري التنفيذ" : published ? "تأكيد الإيقاف" : "تأكيد النشر"}
          </AlertDialogAction>
        </AlertDialogFooter>
        {error && <div className="text-destructive text-sm mt-2">{error}</div>}
      </AlertDialogContent>
    </AlertDialog>
  );
}
