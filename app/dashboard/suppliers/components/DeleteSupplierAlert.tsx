"use client";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteSupplier, getSupplierDetails } from "../actions/supplierActions";
import { Trash, Loader2 } from "lucide-react";
import { Button } from "../../../../components/ui/button";

interface DeleteSupplierAlertProps {
  supplierId: string;
}

// Centralized UI text
const UI_TEXT = {
  deleteButton: "حذف",
  alertTitle: "هل أنت متأكد؟",
  alertDescriptionWithProducts:
    "هذا الشركة مرتبط بواحد أو أكثر من المنتجات. يرجى حذف المنتجات المرتبطة أولاً.",
  alertDescriptionWithoutProducts:
    "لا يمكن التراجع عن هذا الإجراء. سيتم حذف الشركة بشكل دائم.",
  cancelButton: "إلغاء",
  confirmDeleteButton: "حذف",
  deleteInProgress: "جاري الحذف...",
  errorMessage: "حدث خطأ أثناء حذف الشركة.",
};

export default function DeleteSupplierAlert({
  supplierId,
}: DeleteSupplierAlertProps) {
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasProducts, setHasProducts] = useState<boolean>(false);

  // Fetch supplier details to check if it has related products
  useEffect(() => {
    const fetchSupplierDetails = async () => {
      try {
        const { hasProducts } = await getSupplierDetails(supplierId);
        setHasProducts(hasProducts);
      } catch (error) {
        console.error(
          "Error fetching supplier details:",
          error instanceof Error ? error.message : "Unknown error"
        );
      }
    };
    fetchSupplierDetails();
  }, [supplierId]);

  // Handle supplier deletion
  const handleDelete = async () => {
    setIsLoading(true);
    setMessage(null); // Clear previous messages

    try {
      await deleteSupplier(supplierId);
      window.location.reload(); // Refresh the page after successful deletion
    } catch (error) {
      setMessage(UI_TEXT.errorMessage); // Use centralized error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="w-full hover:bg-destructive">
          <Trash className="h-4 w-4" /> {UI_TEXT.deleteButton}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background text-foreground border-border shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            {UI_TEXT.alertTitle}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            {hasProducts
              ? UI_TEXT.alertDescriptionWithProducts
              : UI_TEXT.alertDescriptionWithoutProducts}
          </AlertDialogDescription>
          {message && (
            <p className="mt-2 text-sm text-destructive">{message}</p>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border border-input bg-background hover:bg-accent">
            {UI_TEXT.cancelButton}
          </AlertDialogCancel>
          {!hasProducts && (
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  {UI_TEXT.deleteInProgress}
                </>
              ) : (
                UI_TEXT.confirmDeleteButton
              )}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
