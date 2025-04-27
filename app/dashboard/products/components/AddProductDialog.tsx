"use client"
import AddProductForm from "./AddProductForm";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface AddProductDialogProps {
  supplierId: string;
  disabled?: boolean;
}

export default function AddProductDialog({ supplierId, disabled }: AddProductDialogProps) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90" disabled={disabled} onClick={() => setOpen(true)}>
          إضافة منتج جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-[90vw] sm:w-[90vw] sm:max-w-[90vw] md:w-[90vw] md:max-w-2xl lg:w-[90vw] lg:max-w-3xl bg-background text-foreground border-border shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold text-primary mb-2 text-center tracking-tight">
            إضافة منتج جديد
          </DialogTitle>
        </DialogHeader>
        <AddProductForm supplierId={supplierId} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
