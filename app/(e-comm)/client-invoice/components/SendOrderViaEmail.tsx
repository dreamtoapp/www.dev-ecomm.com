"use client"
import React, { useState } from 'react';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { generateInvoicePDF } from '@/utils/backpdf';
import { sendInvoiceEmail } from '@/app/dashboard/show-invoice/actions/sendInvoiceEmail';

function SendOrderViaEmail() {
  const [ccEmail, setCcEmail] = useState<string>('');
  const [order, setOrder] = useState<{ customerEmail: string; orderNumber: string } | null>(null);

  const handleSendInvoice = async () => {
    toast.info("جارٍ إرسال الفاتورة...");
    try {
      const pdfBlob = await generateInvoicePDF(order);
      await sendInvoiceEmail({
        to: order?.customerEmail,
        cc: ccEmail || undefined, // Add CC email if provided
        orderNumber: order?.orderNumber,
        pdfBlob,
      });
      toast.success("تم إرسال الفاتورة بنجاح!");
    } catch (error) {
      console.error("Error sending invoice:", error);
      toast.error("فشل في إرسال الفاتورة.");
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-green-600 text-white px-4 py-2 rounded-md w-full">
            إرسال الفاتورة عبر البريد الإلكتروني
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تأكيد إرسال الفاتورة</DialogTitle>
            <DialogDescription>
              هل أنت متأكد أنك تريد إرسال الفاتورة إلى{" "}
              <span className="text-green-500">
                {order?.customerEmail}
              </span>
              ؟ يمكنك أيضًا إضافة بريد إلكتروني في خانة النسخة الكربونية أدناه.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="البريد الإلكتروني للنسخة الكربونية (اختياري)"
              value={ccEmail}
              onChange={(e) => setCcEmail(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              // onClick={handleSendInvoice}
              className="bg-green-600 text-white px-4 py-2 rounded-md w-full"
            >
              تأكيد وإرسال
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SendOrderViaEmail;
