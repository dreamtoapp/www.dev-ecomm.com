"use client";
import React, { useState } from "react";
import AddProductDialog from "../../products/components/AddProductDialog";
import ProductTable from "./ProductTable";
import PaginationControls from "./PaginationControls";
import ProductFilters from "./ProductFilters";
import SupplierSelect from "./SupplierSelect";
import { Eye } from "lucide-react";

export default function ProductsControlClient({
  products,
  total,
  page,
  pageSize,
}: {
  products: any[];
  total: number;
  page: number;
  pageSize: number;
}) {
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);
  const [supplierCount, setSupplierCount] = useState(0);

  return (
    <div className="container mx-auto py-8" dir="rtl">
      {/* Main section title only once */}
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl font-bold text-primary">إدارة المنتجات</h1>
        <p className="text-muted-foreground">عرض جميع المنتجات، التصفية، والبحث، مع إمكانية إضافة منتج جديد.</p>
      </div>
      {/* Filter + Add Product: Best Practice Layout */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Filter bar */}
        <div className="flex-1 max-w-md">
          <ProductFilters />
        </div>
        {/* Add Product Section - blue card */}
        <div className="flex-1 bg-blue-50 border border-blue-300 rounded-lg p-4 flex flex-col md:flex-row md:items-end gap-4 min-w-[320px]">
          {/* Supplier select and AddProductDialog in one line */}
          <div className="flex flex-row items-center gap-3 w-full">
            <SupplierSelect value={selectedSupplierId} onChange={setSelectedSupplierId} onSupplierCount={setSupplierCount} />
            {selectedSupplierId && supplierCount > 0 && (
              <div className="flex-1">
                <AddProductDialog supplierId={selectedSupplierId} disabled={false} />
              </div>
            )}
          </div>
        </div>
      </div>
      <ProductTable
        page={page}
        pageSize={pageSize}
        products={products}
        total={total}
      />
      <PaginationControls
        page={page}
        pageSize={pageSize}
        total={total}
      />
    </div>
  );
}
