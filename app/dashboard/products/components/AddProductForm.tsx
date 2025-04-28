"use client"
import { useActionState, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import InputField from "../../../../components/InputField";
import { createProduct } from "../actions";
import ImageUpload from "@/components/image-upload";
import { TooltipProvider } from "@/components/ui/tooltip";
import SupplierSelect from "../../products-control/components/SupplierSelect";

interface AddProductFormProps {
  supplierId?: string; 
  onSuccess?: () => void;
}

export default function AddProductForm({ supplierId: initialSupplierId, onSuccess }: AddProductFormProps) {
  const [supplierId, setSupplierId] = useState<string | null>(initialSupplierId ?? null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>({});

  const handleFileSelect = (file: File | null) => {
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const [state, addAction, isPending] = useActionState(createProduct, { success: false, message: "" });

  useEffect(() => {
    if (state.success && state.message) {
      import("@/lib/swal-config").then(({ default: ReactSwal }) => {
        ReactSwal.fire({
          icon: "success",
          title: "تمت إضافة المنتج بنجاح",
          text: state.message,
          timer: 2000,
          showConfirmButton: false,
          position: "top",
          toast: true,
        });
      });
      if (onSuccess) onSuccess();
    }
  }, [state, onSuccess]);

  // Disable product form fields if supplier not selected
  const isSupplierSelected = !!supplierId;

  return (
    <form
      className="space-y-4 p-4 bg-gradient-to-br from-background to-muted/60 rounded-xl shadow-xl border border-border"
      onSubmit={e => {
        e.preventDefault();
        if (!supplierId) return;
        const formData = new FormData(e.currentTarget);
        formData.append("supplierId", supplierId);
        addAction(formData);
      }}
    >
      {/* Supplier Selection (if not provided) */}
      {!initialSupplierId && (
        <div className="mb-4">
          <label className="block mb-1 font-bold text-right">اختر المورد <span className="text-red-500">*</span></label>
          <SupplierSelect value={supplierId} onChange={setSupplierId} />
          {!supplierId && (
            <div className="text-xs text-red-600 mt-1">يرجى اختيار المورد لإكمال العملية</div>
          )}
        </div>
      )}
      {/* Product fields - disabled until supplier is selected */}
      <fieldset disabled={!isSupplierSelected} className={!isSupplierSelected ? "opacity-50 pointer-events-none" : ""}>
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
              error={errors.name}
              className="  shadow-sm w-full"
            />
            <InputField
              name="price"
              label="السعر"
              type="number"
              placeholder="أدخل السعر"
              error={errors.price}
              className="  shadow-sm flex-1"
            />
            <InputField
              name="size"
              label="الحجم"
              placeholder="أدخل الحجم (مثل: 1 لتر، 500 مل)"
              error={errors.size}
              className="rounded-lg shadow-sm w-full"
            />
            <InputField
              name="details"
              label="تفاصيل المنتج"
              placeholder="أدخل تفاصيل المنتج..."
              error={errors.details}
              className="  shadow-sm min-h-[60px] w-full"
              as="textarea"
              rows={3}
              maxLength={300}
            />
          </div>
        </div>
      </fieldset>
      {state.message && (
        <div
          className={`mt-4 p-3 rounded ${state.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {state.message}
        </div>
      )}
      <div className="flex justify-end gap-2 pt-2">
        <Button
          disabled={isPending || !isSupplierSelected}
          type="submit"
          className="min-w-[140px] bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-md"
        >
          {isPending ? "جارٍ الإضافة..." : "إضافة المنتج"}
        </Button>
      </div>
    </form>
  );
}
