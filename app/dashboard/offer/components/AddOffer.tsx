"use client";
import {
  useActionState,
  useEffect,
  useState,
} from 'react';

import {
  ImageIcon,
  Loader2,
  ShoppingBasket,
  Tag,
} from 'lucide-react';

import ImageUpload from '@/components/image-upload';
import { InputWithValidation } from '@/components/InputField';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

import { createOffer } from '@/app/dashboard/offer/actions';
import { FaAddressCard } from 'react-icons/fa';

interface EditSupplierDialogProps {
  supplier: {
    id: string;
    name: string;
  };
  logo: string | null;
};

// Extracted Form Component
const OfferForm = ({ onSuccess }: { onSuccess: () => void }) => {
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
 



  const handleFileSelect = (file: File | null) => {
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };


  const [state, addAction, isPending] = useActionState(createOffer, { success: false, message: "" });


  useEffect(() => {
    if (state.success) {
      onSuccess();
    }
  }, [state.success, onSuccess]);


  return (
    <form action={addAction} className="overflow-y-auto max-h-[350px] space-y-4 p-4">
      <InputWithValidation
        name="name"
        label="اسم العرض"
        placeholder="أدخل اسم العرض"
        required
        error="الاسم  مطلوب"
      />

      <Label className="block">
        <span className="flex items-center gap-1 mb-2">
          <ImageIcon className="w-4 h-4" />
          شعار العرض
        </span>
        <ImageUpload
          name="logo"
          initialImage={previewUrl}
          onImageUpload={handleFileSelect}
          aspectRatio={1}
          maxSizeMB={2}
          allowedTypes={['image/png', 'image/jpeg', 'image/webp']}
          uploadLabel="انقر لرفع الصورة"
          previewType="contain"
          className="h-36"
          alt="شعار الشركة"
          minDimensions={{ width: 300, height: 300 }}
        />

      </Label>




      {state.message && (
        <div
          className={`mt-4 p-3 rounded ${state.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
        >
          {state.message}
        </div>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            جاري الحفظ...
          </>
        ) : (
          "حفظ التغييرات"
        )}
      </Button>
    </form>
  );
};

// Main Dialog Component
export default function AddOffer() {
  const [open, setOpen] = useState(false);
  const handleSuccess = () => {
    setTimeout(() => setOpen(false), 1500);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" aria-label="تعديل">
          <Tag className="h-4 w-4 text-primary-foreground" /> اضافة عرض جديد
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] min-h-[500px] bg-background text-foreground border-border shadow-lg" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold"><Tag className="h-4 w-4 text-primary" /> اضافة عرض جديدة</DialogTitle>
          <DialogDescription className='text-right'>قم باضافة تفاصيل العرض هنا</DialogDescription>
        </DialogHeader>
        <OfferForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}