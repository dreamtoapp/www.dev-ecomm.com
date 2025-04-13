"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createOrUpdateSupplier } from "../actions/supplierActions";
import { z } from "zod"; // Import Zod
import { supplierSchema } from "../logic/validation";
import InputField from "../../../../components/InputField";
import ImageUploadField from "../../../../components/ImageUploadField";
import { Loader2 } from "lucide-react"; // Import a loading spinner icon

export default function AddSupplierDialog() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false); // State to track loading

  // Handle changes in input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear errors
  };

  // Handle file upload
  const handleFileSelect = (file: File | null) => {
    if (file) {
      setLogoFile(file); // Update the selected file in the parent state
      setErrors((prevErrors) => ({ ...prevErrors, logo: "" })); // Clear logo error
    } else {
      setLogoFile(null); // Reset the selected file
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setLoading(true); // Start loading
      // Validate form data using Zod
      supplierSchema.parse(formData);
      // Ensure a logo file is provided
      if (!logoFile) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          logo: "Logo is required.",
        }));
        setLoading(false); // Stop loading if validation fails
        return;
      }
      // If validation passes, submit the form
      await createOrUpdateSupplier(null, formData, logoFile);
      window.location.reload();
      // Reset form and close dialog (optional)
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
      setLogoFile(null);
      setPreviewUrl(null);
      setErrors({});
    } catch (error: any) {
      // Handle Zod validation errors
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err: z.ZodIssue) => {
          fieldErrors[err.path[0]] = err.message;
        });
        // Find the first error and display it
        const firstErrorKey = Object.keys(fieldErrors)[0];
        setErrors({ [firstErrorKey]: fieldErrors[firstErrorKey] });
      } else {
        // Log other errors (e.g., API errors)
        console.error("Error adding supplier:", error.message);
      }
    } finally {
      // Ensure loading state is reset regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          إضافة شركة
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] min-h-[500px] bg-background text-foreground border-border shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground">
            إضافة شركة جديد
          </DialogTitle>
        </DialogHeader>
        {/* Fixed Tabs List */}

        {/* Form Content */}
        <form className="space-y-4 p-4 overflow-y-auto max-h-[350px]">
          {/* Supplier Details Tab */}

          <div className="space-y-4">
            <InputField
              name="name"
              label="اسم الشركة"
              placeholder="أدخل اسم الشركة"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <div className="flex flex-col h-full">
              <ImageUploadField
                label="الشعار"
                onFileSelect={handleFileSelect} // Pass the callback to receive the selected file
                error={errors.logo} // Pass any validation error
                width={200}
                height={200}
              />
            </div>
          </div>

          {/* Logo Upload Tab */}
        </form>
        {/* Single Error Message */}
        <div className="mt-4 px-4">
          {Object.entries(errors).map(([field, message]) => (
            <p key={field} className="text-sm text-destructive">
              {message}
            </p>
          ))}
        </div>
        {/* Submit Button with Loader */}
        <div className="w-full bg-background py-4 border-t border-border">
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
              "حفظ الشركة"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
