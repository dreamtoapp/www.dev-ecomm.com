"use client";
import React, { useState } from "react";
import SupplierSelect from "./SupplierSelect";
import AddProductDialog from "../../products/components/AddProductDialog";
import ProductTable from "./ProductTable";
import PaginationControls from "./PaginationControls";

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
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-2xl font-bold text-primary">إدارة المنتجات</h1>
        <p className="text-muted-foreground">عرض جميع المنتجات، التصفية، والبحث، مع إمكانية إضافة منتج جديد.</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 mb-4">
          <SupplierSelect value={selectedSupplierId} onChange={setSelectedSupplierId} onSupplierCount={setSupplierCount} />
          <AddProductDialog supplierId={selectedSupplierId || ""} disabled={!selectedSupplierId || supplierCount === 0} />
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
    </div>
  );
}
