"use client";
import {
  useCallback,
  useState,
} from 'react';

import { Loader2 } from 'lucide-react';

import ImageUploadField from '@/components/ImageUploadField';
import { Button } from '@/components/ui/button';

import { createOffer } from '../actions/createOffer';

// Centralized UI text for localization
const UI_TEXT = {
  title: "إضافة ترويسة جديدة",
  fields: {
    name: "اسم العرض",
    actualPrice: "سعر العرض",
    size: "الحجم",
    details: "تفاصيل العرض",
    image: "صورة العرض",
    supplier: "الغرض",
  },
  placeholders: {
    name: "أدخل اسم العرض",
    actualPrice: "أدخل السعر الفعلي",
    size: "أدخل الحجم (مثل: 1 لتر، 500 مل)",
    details: "أدخل تفاصيل العرض...",
    supplier: "اختر نوع العرض",
  },
  buttons: {
    submit: "إضافة الترويسة",
    submitting: "جاري الحفظ...",
    showOffers: "مشاهدة الترويسات",
    fetchingOffers: "جاري جلب البيانات...",
  },
  errors: {
    required: "هذا الحقل مطلوب",
    imageRequired: "صورة العرض مطلوبة",
  },
};

interface AddOfferFormProps {
  suppliers: { id: string; name: string }[]; // Pass suppliers as a prop
}

export default function AddOfferForm({ suppliers }: AddOfferFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    actualPrice: 0,
    size: "",
    details: "",
    supplierId: "", // Use supplierId instead of categoryId
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  // Handle text input changes
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const parsedValue =
        name === "actualPrice" ? parseFloat(value) || 0 : value;
      setFormData((prev) => ({ ...prev, [name]: parsedValue }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    []
  );

  // Handle file input changes
  const handleFileSelect = useCallback((file: File | null) => {
    setImageFile(file);
    setErrors((prev) => ({ ...prev, imageUrl: "" }));
  }, []);

  // Handle supplier selection
  const handleSupplierChange = (value: string) => {
    setFormData((prev) => ({ ...prev, supplierId: value }));
    setErrors((prev) => ({ ...prev, supplierId: "" }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Validate required fields
      // if (!formData.supplierId) {
      //   setErrors((prev) => ({ ...prev, supplierId: "فئة العرض مطلوب" }));
      //   setLoading(false);
      //   return;
      // }

      // Validate image file
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
      form.append("name", formData.name);
      form.append("size", formData.size);
      form.append("price", formData.actualPrice.toString());
      form.append("details", formData.details);
      form.append("supplierId", formData.supplierId);
      form.append("image", imageFile);

      // Call the server action
      await createOffer(form);
      window.location.reload(); // Refresh the page after adding
    } catch (error: any) {
      console.error("Error adding offer:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-foreground border-border shadow-lg p-6 rounded-lg max-w-2xl mx-auto">
      {/* Form Header */}
      <header className="text-center mb-4">
        <h2 className="text-3xl font-bold text-primary">{UI_TEXT.title}</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          قم بإضافة ترويسة جديده إلى المتجر الخاص بك
        </p>
        {/* Supplier Select in Header */}
        <div className="mt-4 flex justify-center">
          <div className="w-full max-w-md">
            {/* <label className="text-sm font-medium text-foreground">
              {UI_TEXT.fields.supplier}
            </label> */}
            {/* <Select
              onValueChange={handleSupplierChange}
              value={formData.supplierId}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder={UI_TEXT.placeholders.supplier} />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((supplier) => (
                  <SelectItem key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
            {errors.supplierId && (
              <p className="text-sm text-destructive mt-1">
                {errors.supplierId}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Form Fields */}
      <form className="space-y-4">
        {/* Name Field */}
        {/* <InputField
          name="name"
          label={UI_TEXT.fields.name}
          placeholder={UI_TEXT.placeholders.name}
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        /> */}

        {/* Size and Actual Price Fields */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border p-2 rounded-md">
          <InputField
            name="size"
            label={UI_TEXT.fields.size}
            placeholder={UI_TEXT.placeholders.size}
            value={formData.size}
            onChange={handleChange}
            error={errors.size}
          />
          <InputField
            name="actualPrice"
            label={UI_TEXT.fields.actualPrice}
            placeholder={UI_TEXT.placeholders.actualPrice}
            value={formData.actualPrice.toString()} // Convert to string for input
            onChange={handleChange}
            error={errors.actualPrice}
            type="number"
          />
        </div> */}

        {/* Details Field */}
        {/* <InputField
          name="details"
          label={UI_TEXT.fields.details}
          placeholder={UI_TEXT.placeholders.details}
          value={formData.details}
          onChange={handleChange}
          error={errors.details}
        /> */}

        {/* Image Upload Field with Buttons */}
        <div className="flex flex-col md:flex-row items-start gap-4">
          {/* Image Upload Section */}
          <div className="w-full md:w-1/2">
            <ImageUploadField
              label={UI_TEXT.fields.image}
              onFileSelect={handleFileSelect}
              error={errors.imageUrl}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 w-full md:w-1/2">
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors py-3 text-lg flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {UI_TEXT.buttons.submitting}
                </>
              ) : (
                UI_TEXT.buttons.submit
              )}
            </Button>
            <Button
              type="button"
              onClick={() => console.log("View Offers")}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors py-3 text-lg"
            >
              {UI_TEXT.buttons.showOffers}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
