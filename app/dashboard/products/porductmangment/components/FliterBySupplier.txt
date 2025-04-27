"use client"; // Mark as a Client Component
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { Package } from "lucide-react"; // Import Lucide icon for visual enhancement
import { useCallback, useState, useEffect } from "react";
import AddProductDialog from "../../products/components/AddProductDialog";

// Centralized UI text for localization
const UI_TEXT = {
  label: "عرض المنتجات حسب",
  placeholder: "اختر شركةًا",
  allSuppliers: "جميع الشركات",
  typeLabel: "النوع: "
};

interface Supplier {
  id: string;
  name: string;
  type: string;
}

interface FilterBySupplierProps {
  suppliers: Supplier[]; // List of suppliers to populate the dropdown
}

export default function FilterBySupplier({ suppliers }: FilterBySupplierProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the current supplierId from the query parameters
  const currentSupplierId = searchParams.get("supplierId") || "all"; // Default to "all" if no supplierId is present

  // State to hold the selected supplier type
  const [selectedSupplierType, setSelectedSupplierType] = useState<string>("");

  // Handle supplier selection
  const handleSupplierChange = useCallback(
    (supplierId: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (supplierId === "all") {
        params.delete("supplierId"); // Remove the supplierId parameter for "All Suppliers"
        setSelectedSupplierType("");
      } else {
        params.set("supplierId", supplierId); // Add or update the supplierId parameter
        // Find the supplier and set its type
        const selectedSupplier = suppliers.find(s => s.id === supplierId);
        setSelectedSupplierType(selectedSupplier ? selectedSupplier.type : "");
      }
      // Update the URL with the new query parameters
      router.push(`?${params.toString()}`);
    },
    [router, searchParams, suppliers]
  );

  // Set initial type if query param is present
  useEffect(() => {
    if (currentSupplierId === "all") {
      setSelectedSupplierType("");
    } else {
      const selectedSupplier = suppliers.find(s => s.id === currentSupplierId);
      setSelectedSupplierType(selectedSupplier ? selectedSupplier.type : "");
    }
  }, [currentSupplierId, suppliers]);

  return (
    <div className="flex items-start  justify-between w-full ">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4 ">
          {/* Label with Icon */}
          <label
            htmlFor="supplier"
            className="text-sm font-medium text-foreground flex items-center gap-2"
            aria-label={UI_TEXT.label}
          >
            <Package className="h-4 w-4 text-primary" />{" "}
            {/* Icon with primary color */}
            {UI_TEXT.label}
          </label>
          {/* Select Dropdown */}
          <Select value={currentSupplierId} onValueChange={handleSupplierChange}>
            <SelectTrigger
              id="supplier"
              className="w-[200px] hover:bg-primary/10 transition-colors"
              aria-describedby="supplier-description"
            >
              <SelectValue placeholder={UI_TEXT.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {/* Option for All Suppliers */}
              <SelectItem
                value="all"
                className="text-primary font-medium hover:bg-primary/10"
              >
                {UI_TEXT.allSuppliers}
              </SelectItem>
              {/* Options for Individual Suppliers */}
              {suppliers.map((supplier) => (
                <SelectItem
                  key={supplier.id}
                  value={supplier.id}
                  className="hover:bg-primary/10"
                >
                  {supplier.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Show supplier type when a supplier is selected */}
        {currentSupplierId !== "all" && selectedSupplierType && (
          <div className="text-xs text-muted-foreground pl-8">
            {UI_TEXT.typeLabel}
            <span className="font-semibold text-primary">{selectedSupplierType === "offer" ? "عرض" : "شركة"}</span>
          </div>
        )}
      </div>
      {selectedSupplierType && <AddProductDialog supplierId={currentSupplierId} />}
    </div>
  );
}
