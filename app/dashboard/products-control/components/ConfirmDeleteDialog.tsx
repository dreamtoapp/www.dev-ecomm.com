"use client";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ConfirmDeleteDialog({ onConfirm, children }: { onConfirm: () => void; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-red-600">تأكيد حذف المنتج</DialogTitle>
        </DialogHeader>
        <div className="py-2 text-right text-base">هل أنت متأكد أنك تريد حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.</div>
        <DialogFooter className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>إلغاء</Button>
          <Button variant="destructive" onClick={() => { onConfirm(); setOpen(false); }}>تأكيد الحذف</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
