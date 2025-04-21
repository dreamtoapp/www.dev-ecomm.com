"use client";
import {
  useActionState,
  useState,
} from 'react';

import {
  ImageIcon,
  Loader2,
  Pencil,
} from 'lucide-react';

import ImageUpload from '@/components/image-upload';
import InputField, { InputWithValidation } from '@/components/InputField';
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

import { updateSupplier } from '../actions/update-supplier';

interface EditSupplierDialogProps {
  supplier: {
    id: string;
    name: string;
    logo: string | null;
  };
}

// Extracted Form Component
const SupplierForm = ({ id, name, logo }: { name: string, logo: string | null, id: string }


) => {

  const [previewUrl, setPreviewUrl] = useState<string | null>(logo || null);



  const handleFileSelect = (file: File | null) => {
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };


  const [state, addAction, isPending] = useActionState(updateSupplier, { success: false, message: "" });


  return (
    <form action={addAction} className="overflow-y-auto max-h-[350px] mt-4 space-y-4 p-4">
      <input type="hidden" name="id" value={id} />
      <InputWithValidation
        name="name"
        label="اسم الشركة"
        placeholder="أدخل اسم الشركة"
        defaultValue={name}
        required
        error="الاسم  مطلوب"
      />

      <Label className="block">
        <span className="flex items-center gap-1 mb-2">
          <ImageIcon className="w-4 h-4" />
          شعار الشركة
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
export default function EditSupplierDialog({ supplier }: EditSupplierDialogProps) {


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full" aria-label="تعديل">
          <Pencil className="h-4 w-4 text-primary" /> تعديل
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] min-h-[500px] bg-background text-foreground border-border shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">تعديل الشركة</DialogTitle>
          <DialogDescription>قم بتعديل تفاصيل الشركة هنا</DialogDescription>
        </DialogHeader>

        <SupplierForm

          id={supplier.id}
          name={supplier.name}
          logo={supplier.logo}



        />
      </DialogContent>
    </Dialog>
  );
}