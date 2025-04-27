import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UpdateProductForm from "./UpdateProductForm";
import { useState } from "react";

interface UpdateProductDialogProps {
  product: any;
}

export default function UpdateProductDialog({ product }: UpdateProductDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setOpen(true)}>
          تعديل المنتج
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[90vw] sm:w-[90vw] sm:max-w-[90vw] md:w-[90vw] md:max-w-2xl lg:w-[90vw] lg:max-w-3xl bg-background text-foreground border-border shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold text-primary mb-2 text-center tracking-tight">
            تعديل المنتج
          </DialogTitle>
        </DialogHeader>
        <UpdateProductForm product={product} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
