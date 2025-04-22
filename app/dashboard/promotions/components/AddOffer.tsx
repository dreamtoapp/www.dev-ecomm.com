"use client";
import {
  useCallback,
  useState,
} from 'react';

import { Loader2 } from 'lucide-react';

import ImageUpload from '@/components/image-upload';
import { Button } from '@/components/ui/button';

import { createOffer } from '../actions/createOffer';
import { toast } from "sonner";

// Centralized UI text for localization
const UI_TEXT = {
  title: "إضافة صورة للسلايدر",
  fields: {
    image: "صورة السلايدر",
  },
  errors: {
    imageRequired: "صورة السلايدر مطلوبة",
  },
  buttons: {
    submit: "رفع الصورة",
    submitting: "جاري الحفظ...",
  },
};

export default function AddOfferForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  // Handle file input changes
  const handleFileSelect = useCallback((file: File | null) => {
    setImageFile(file);
    setErrors((prev) => ({ ...prev, imageUrl: "" }));
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!imageFile) {
        setErrors((prev) => ({
          ...prev,
          imageUrl: UI_TEXT.errors.imageRequired,
        }));
        setLoading(false);
        return;
      }
      // Create FormData object
      const form = new FormData();
      form.append("image", imageFile);
      // Call the server action
      await createOffer(form);
      toast.success("تمت إضافة الصورة بنجاح!");
      setImageFile(null);
      // Optionally, trigger a refresh instead of reload
      // window.location.reload();
    } catch (error: any) {
      console.error("Error adding offer:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-foreground border border-primary/10 shadow-lg p-8 rounded-xl max-w-lg mx-auto mt-8">
      <header className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary mb-1">{UI_TEXT.title}</h2>
        <p className="text-muted-foreground mt-1 text-base">
          هذه الصورة ستظهر في السلايدر الرئيسي على الصفحة الرئيسية. الرجاء رفع صورة عالية الجودة (يفضل أبعاد 1200×500 بكسل).
        </p>
      </header>
      <form className="space-y-6" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
        <div>
          <label className="block mb-1 text-sm font-medium text-foreground" htmlFor="image">{UI_TEXT.fields.image}</label>
          <ImageUpload
            onImageUpload={handleFileSelect}
            error={errors.imageUrl}
            uploadLabel="اختر صورة للسلايدر أو اسحبها هنا"
            showInstruction={true}
            width={1200}
            height={500}
            maxSizeMB={2}
            allowedTypes={["image/jpeg", "image/png", "image/webp"]}
            i18n={{
              uploadLabel: 'اسحب وأفلت الصورة هنا أو انقر للتحميل',
              chooseImage: 'اختر صورة',
              noImage: 'لا توجد صورة',
              previewTitle: 'معاينة الصورة',
              maxSize: 'الحد الأقصى للحجم: 2 ميجابايت',
              minDimensions: 'الأبعاد الدنيا: 1200×500',
              allowedTypes: 'الأنواع المسموحة: JPG, PNG, WEBP',
              errorFallback: 'تعذر تحميل الصورة',
              errorRejected: 'تم رفض الصورة',
            }}
            className="border-2 border-dashed border-primary/30 hover:border-primary/70 focus-within:border-primary/80 transition-all bg-muted/30"
            initialImage={imageFile ? URL.createObjectURL(imageFile) : undefined}
          />
          {errors.imageUrl && <span className="text-destructive text-xs mt-1">{errors.imageUrl}</span>}
          <p className="text-xs text-muted-foreground mt-2">يفضل رفع صورة أفقية واضحة بأبعاد 1200×500 بكسل.</p>
        </div>
        <div className="flex justify-center pt-2">
          <Button
            type="submit"
            className="w-full md:w-1/2 bg-primary text-white rounded-lg py-2 text-lg font-semibold hover:bg-primary/90 transition-colors"
            disabled={loading || !imageFile}
            aria-disabled={loading || !imageFile}
            aria-busy={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                {UI_TEXT.buttons.submitting}
              </span>
            ) : (
              UI_TEXT.buttons.submit
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
