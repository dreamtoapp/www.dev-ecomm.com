"use client";
import { useState, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription, // Add this import
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Loader2 } from "lucide-react";
import { createOrUpdateSupplier } from "../actions/supplierActions";
import { z } from "zod";
import { supplierSchema } from "../logic/validation";
import InputField from "@/components/InputField";
import ImageUploadField from "@/components/ImageUploadField";
import { toast } from "sonner";

// Centralized UI text for localization
const UI_TEXT = {
  editButton: "تعديل",
  dialogTitle: "تعديل الشركة",
  dialogDescription: "قم بتعديل تفاصيل الشركة هنا.", // Add a description
  companyName: "اسم الشركة",
  companyNamePlaceholder: "أدخل اسم الشركة",
  logoLabel: "الشعار",
  logoRequiredError: "الشعار مطلوب.",
  saveChanges: "حفظ التغييرات",
  saving: "جاري الحفظ...",
  successToast: "تم التحديث بنجاح",
  successDescription: "تم تحديث بيانات الشركة بنجاح.",
  errorToast: "حدث خطأ",
  errorDescription: "فشل تحديث بيانات الشركة. يرجى المحاولة مرة أخرى.",
};

interface EditSupplierDialogProps {
  supplier: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    logo: string | null;
    publicId: string | null;
  };
}

export default function EditSupplierDialog({
  supplier,
}: EditSupplierDialogProps) {
  const [formData, setFormData] = useState({
    name: supplier.name,
    email: supplier.email,
    phone: supplier.phone,
    address: supplier.address,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    supplier.logo || null
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [imageLoading, setImageLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Debug: Log the supplier logo URL when the component mounts

  // Handle changes in input fields
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  }, []);

  // Handle file upload
  const handleFileSelect = useCallback((file: File | null) => {
    if (file) {
      setLogoFile(file);
      setErrors((prevErrors) => ({ ...prevErrors, logo: "" }));

      const filePreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(filePreviewUrl);
    } else {
      setLogoFile(null);
      setPreviewUrl(null);
    }
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    try {
      setSubmitLoading(true);

      supplierSchema.parse(formData);

      if (!logoFile && !supplier.logo) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          logo: UI_TEXT.logoRequiredError,
        }));
        setSubmitLoading(false);
        return;
      }

      await createOrUpdateSupplier(supplier.id, formData, logoFile);

      toast.success(UI_TEXT.successToast, {
        description: UI_TEXT.successDescription,
      });

      window.location.reload();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err: z.ZodIssue) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        toast.error(UI_TEXT.errorToast, {
          description: UI_TEXT.errorDescription,
        });
        console.error("Error updating supplier:", error.message);
      }
      setSubmitLoading(false);
    }
  }, [formData, logoFile, supplier.id, supplier.logo]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full"
          aria-label={UI_TEXT.editButton}
        >
          <Pencil className="h-4 w-4" /> {UI_TEXT.editButton}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px] min-h-[500px] bg-background text-foreground border-border shadow-lg"
        // aria-describedby="dialog-description" // Add aria-describedby
      >
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground">
            {UI_TEXT.dialogTitle}
          </DialogTitle>
          {/* Add DialogDescription here */}
          <DialogDescription id="dialog-description">
            {UI_TEXT.dialogDescription}
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[350px] mt-4 space-y-4 p-4">
          {/* Supplier Details */}
          <div className="space-y-4">
            <InputField
              name="name"
              label={UI_TEXT.companyName}
              placeholder={UI_TEXT.companyNamePlaceholder}
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
          </div>

          {/* Logo Upload */}
          <div className="flex flex-col h-full">
            <ImageUploadField
              label={UI_TEXT.logoLabel}
              onFileSelect={handleFileSelect}
              error={errors.logo}
              width={200}
              height={200}
              previewUrl={previewUrl}
            />
            {imageLoading && (
              <div className="flex justify-center items-center mt-4">
                <Loader2 className="animate-spin h-5 w-5 text-muted-foreground" />
              </div>
            )}
          </div>
        </div>

        {/* Error Messages */}
        {Object.keys(errors).length > 0 && (
          <div className="mt-4 px-4 space-y-2">
            {Object.entries(errors).map(([field, message]) => (
              <p key={field} className="text-sm text-destructive">
                {message}
              </p>
            ))}
          </div>
        )}

        {/* Fixed Submit Button */}
        <div className="w-full bg-background py-4 border-t border-border">
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={submitLoading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {submitLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                {UI_TEXT.saving}
              </>
            ) : (
              UI_TEXT.saveChanges
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
