import React from "react";
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
} from "../../../../components/ui/alert-dialog";
import { Button } from "../../../../components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteItemDialogProps {
  productId: string;
  productName: string;
  removeItem: (id: string) => void;
}

const DeleteItemDialog = ({
  productId,
  productName,
  removeItem,
}: DeleteItemDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 text-red-600 border-red-600 hover:bg-red-50 dark:text-red-500 dark:border-red-500 dark:hover:bg-red-900/20 transition-colors"
          aria-label={`Remove ${productName} from cart`}
        >
          <Trash2 size={16} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-foreground">
            هل أنت متأكد؟
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            هل تريد حذف المنتج "{productName}" من السلة؟
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-muted text-muted-foreground hover:bg-muted/80">
            إلغاء
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => removeItem(productId)}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            حذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteItemDialog;
