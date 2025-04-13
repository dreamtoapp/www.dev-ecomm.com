"use client"; // Mark as a Client Component
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { z } from "zod"; // Import Zod
import { createProduct } from "../actions/Actions";
import { productSchema } from "../logic/validation"; // Import Zod schema for product
import { Loader2 } from "lucide-react"; // Import a loading spinner icon
import InputField from "@/components/InputField"; // Reusable InputField
import ImageUploadField from "@/components/ImageUploadField"; // Reusable ImageUploadField

interface AddProductDialogProps {
  supplierId: string; // Explicitly define supplierId as a prop
}

export default function AddProductDialog({
  supplierId,
}: AddProductDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    size: "",
    details: "", // Added details field
  });
  const [imageFile, setImageFile] = useState<File | null>(null); // File selected by the user
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Preview URL for the uploaded image
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false); // Loading state for form submission

  // Handle text input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Convert price to a number if the field is "price"
    const parsedValue = name === "price" ? parseFloat(value) || 0 : value;
    setFormData({ ...formData, [name]: parsedValue });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear errors
  };

  // Handle file input changes

  const handleFileSelect = (file: File | null) => {
    if (file) {
      setImageFile(file); // Update the selected file in the parent state
      setErrors((prevErrors) => ({ ...prevErrors, logo: "" })); // Clear logo error
    } else {
      setImageFile(null); // Reset the selected file
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setLoading(true); // Start loading
      // Convert price to a number before validation
      const parsedFormData = {
        ...formData,
        price: parseFloat(formData.price.toString()) || 0,
      };
      // Ensure an image file is provided
      if (!imageFile) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          imageUrl: "Product image is required.",
        }));
        setLoading(false); // Stop loading if validation fails
        return;
      }
      // Validate form data using Zod
      productSchema.parse(parsedFormData);
      // Call the createOrUpdateProduct function
      await createProduct({ ...parsedFormData, supplierId }, imageFile);
      window.location.reload(); // Refresh the page after adding
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        // Map Zod errors to a key-value object
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err: z.ZodIssue) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Error adding product:", error.message);
      }
      setLoading(false); // Stop loading if there's an error
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          إضافة منتج جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background text-foreground border-border shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            إضافة منتج جديد
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-4 p-4">
          {/* Name Field */}
          <InputField
            name="name"
            label="اسم المنتج"
            placeholder="أدخل اسم المنتج"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          {/* Price Field */}
          <InputField
            name="price"
            label="السعر"
            type="number"
            placeholder="أدخل السعر"
            value={formData.price.toString()}
            onChange={handleChange}
            error={errors.price}
          />
          {/* Size Field */}
          <InputField
            name="size"
            label="الحجم"
            placeholder="أدخل الحجم (مثل: 1 لتر، 500 مل)"
            value={formData.size}
            onChange={handleChange}
            error={errors.size}
          />
          {/* Details Field */}
          <InputField
            name="details"
            label="تفاصيل المنتج"
            placeholder="أدخل تفاصيل المنتج..."
            value={formData.details}
            onChange={handleChange}
            error={errors.details}
          />
          {/* Image Upload Field */}
          <ImageUploadField
            label="صورة المنتج"
            previewUrl={previewUrl}
            onFileSelect={handleFileSelect}
            error={errors.imageUrl}
          />
          {/* Submit Button with Loader */}
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading} // Disable button while loading
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> جاري الحفظ...
              </>
            ) : (
              "إضافة المنتج"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
