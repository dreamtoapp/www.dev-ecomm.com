import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const EmptyState: React.FC = () => {
  return (
    <Alert variant="destructive" className="mt-4">
      <AlertTitle className="text-lg font-bold text-destructive flex items-center gap-2">
        <AlertCircle className="h-5 w-5" /> لا توجد منتجات متاحة
      </AlertTitle>
      <AlertDescription className="text-sm text-destructive-foreground">
        لم يتم العثور على منتجات لهذا الشركة. يرجى اختيار شركة آخر أو المحاولة
        لاحقًا.
      </AlertDescription>
      <Button
        variant="link"
        className="mt-4 p-0 text-sm text-primary hover:underline"
      >
        إعادة المحاولة
      </Button>
    </Alert>
  );
};

export default EmptyState;
