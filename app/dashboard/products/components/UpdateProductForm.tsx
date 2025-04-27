"use client"
import { useActionState, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { updateProduct } from "../itemdetail/[id]/actions";
import ImageUpload from "@/components/image-upload";
import InputField from "@/components/InputField";
import ReactSwal from "@/lib/swal-config";

interface UpdateProductFormProps {
  product: any;
  onSuccess?: () => void;
}

export default function UpdateProductForm({ product, onSuccess }: UpdateProductFormProps) {

  const [previewUrl, setPreviewUrl] = useState<string | null>(product?.imageUrl || null);
  const [errors, setErrors] = useState<any>({});

  const handleFileSelect = (file: File | null) => {
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const [state, addAction, isPending] = useActionState(updateProduct, { success: false, message: "" });

  useEffect(() => {
    if (state.success && state.message) {
      ReactSwal.fire({
        icon: "success",
        title: "تم تحديث المنتج بنجاح",
        text: state.message,
        timer: 2000,
        showConfirmButton: false,
        position: "top",
        toast: true,
      });
      if (onSuccess) onSuccess();
    }
  }, [state.success, state.message, onSuccess]);

  return (
    <>

      <form
        className="space-y-4 p-4 bg-gradient-to-br from-background to-muted/60 rounded-xl shadow-xl border border-border"
        action={addAction}
        autoComplete="off"
      >
        <input type="hidden" name="id" value={product.id} />
        <div className="flex flex-col md:flex-row gap-6 justify-start">
          {/* Image Upload - visually prominent on left (desktop) or top (mobile) */}
          <div className="flex-1 flex flex-col items-center md:items-start justify-center gap-2">
            <ImageUpload
              name="image"
              initialImage={previewUrl}
              onImageUpload={handleFileSelect}
              aspectRatio={1}
              maxSizeMB={2}
              allowedTypes={['image/png', 'image/jpeg', 'image/webp']}
              uploadLabel="صورة المنتج"
              previewType="contain"
              // className="h-36"
              alt="صورة المنتج"
              minDimensions={{ width: 300, height: 300 }}
            />
          </div>
          {/* Fields */}
          <div className="flex-[2] flex flex-col gap-4 w-full max-w-2xl mx-auto">
            <InputField
              name="name"
              label="اسم المنتج"
              placeholder="أدخل اسم المنتج"
              defaultValue={product.name}
              error={errors.name}
              className="  shadow-sm w-full"
            />

            <InputField
              name="price"
              label="السعر"
              type="number"
              placeholder="أدخل السعر"
              defaultValue={product.price}
              step={0.01}
              // error={errors.price}
              className="shadow-sm flex-1"
            />
            <InputField
              name="size"
              label="الحجم"
              placeholder="أدخل الحجم (مثل: 1 لتر، 500 مل)"
              defaultValue={product.size}
              error={errors.size}
              className="rounded-lg shadow-sm w-full"
            />

            <InputField
              name="details"
              label="تفاصيل المنتج"
              placeholder="أدخل تفاصيل المنتج..."
              defaultValue={product.details}
              error={errors.details}
              className="  shadow-sm min-h-[60px] w-full"
              as="textarea"
              rows={3}
              maxLength={300}
            />
          </div>
        </div>
        {/* Actions */}
        {state.message && (
          <div
            className={`mt-4 p-3 rounded ${state.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
          >
            {state.message}
          </div>
        )}
        <div className="flex justify-end gap-2 pt-2">

          <Button disabled={isPending}
            type="submit"
            className="min-w-[140px] bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-md" >
            {isPending ? "جارٍ التعديل..." : "تعديل المنتج"}
          </Button>
        </div>
      </form>
    </>
  );
}
