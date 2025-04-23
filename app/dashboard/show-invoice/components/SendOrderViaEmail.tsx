"use client"
import React, { useState } from 'react';


{ }
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
import { sendInvoiceEmail } from '@/app/dashboard/show-invoice/actions/sendInvoiceEmail';
import { toast } from 'sonner';

function SendOrderViaEmail({ invoiceNumber, orderId, email }: { invoiceNumber: string, orderId: string, email: string }) {
  const [ccEmail, setCcEmail] = useState<string>('');
  const [order, setOrder] = useState<{ customerEmail: string; orderNumber: string } | null>(null);

  const handleSendInvoice = async () => {
    toast.info("جارٍ إرسال الفاتورة...");
    try {
      // const pdfBlob = await generateInvoicePDF(order);
      await sendInvoiceEmail({
        to: email,
        cc: ccEmail || undefined, // Add CC email if provided
        orderNumber: invoiceNumber,
        orderId: orderId,


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
            إرسال الفاتورة   عبر البريد الإلكتروني
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className='mt-5'>
            <DialogTitle className='text-right'>تأكيد إرسال الفاتورة رقم : {invoiceNumber}</DialogTitle>
            <DialogDescription className='text-right'>
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

          <div className='flex flex-col items-start justify-between w-full mt-5 space-y-3'>
            <div className='w-full'>
              <p className='text-sm text-gray-700 font-medium'>
                سيتم إرسال الفاتورة إلى البريد الإلكتروني:
              </p>
              <p className="text-sm text-green-600 bg-gray-100 px-2 py-1 rounded-md mt-1">
                {email}
              </p>
            </div>
            <div className='w-full'>
              <p className='text-sm text-gray-700 font-medium'>
                نسخة كربونية إلى:
              </p>
              <p className="text-sm text-green-600 bg-gray-100 px-2 py-1 rounded-md mt-1">
                {ccEmail || "لا يوجد بريد إلكتروني مضاف"}
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleSendInvoice}
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
