"use client";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import AddProductDialog from "../../products/components/AddProductDialog";
import ProductTable from "./ProductTable";
import PaginationControls from "./PaginationControls";
import ProductFilters from "./ProductFilters";
import SupplierSelect from "./SupplierSelect";
import { Eye } from "lucide-react";
import { fetchFilteredProducts } from "../actions/fetchFilteredProducts";
import { debounce } from "@/utils/debounce";

export default function ProductsControlClient() {
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);
  const [supplierCount, setSupplierCount] = useState(0);

  // Filter state as an object
  type Filters = { name: string; supplierId: string | null; status: string; type: string; stock: string };
  const initialFilters: Filters = { name: "", supplierId: null, status: "all", type: "all", stock: "all" };
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [filteredProducts, setFilteredProducts] = useState<any[] | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync page state with URL on mount and when URL changes
  useEffect(() => {
    const urlPage = parseInt(searchParams.get('page') || '1', 10);
    if (!isNaN(urlPage) && urlPage !== page) {
      setPage(urlPage);
    }
  }, [searchParams]);

  // Fetch products using server action on filter or page change
  const fetchAndSetProducts = useCallback(
    async (overrideFilters?: Partial<Filters>, overridePage?: number, overridePageSize?: number) => {
      setLoading(true);
      const mergedFilters = {
        ...filters,
        ...(overrideFilters || {}),
        page: overridePage ?? page,
        pageSize: overridePageSize ?? pageSize,
      };
      const { products, total } = await fetchFilteredProducts(mergedFilters);
      setFilteredProducts(products);
      setTotal(total);
      setLoading(false);
    },
    [filters, page, pageSize]
  );

  // Handle filter change
  const handleFilterChange = useCallback(async (changed: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...changed }));
    setPage(1);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    router.replace(`?${params.toString()}`, { scroll: false });
    await fetchAndSetProducts(changed, 1);
  }, [fetchAndSetProducts, router, searchParams]);

  // Debounced filter change for name/search
  const debouncedNameFilterChange = useMemo(
    () => debounce((value: string) => handleFilterChange({ name: value }), 300),
    [handleFilterChange]
  );

  // Reset filters to initial state
  const handleResetFilters = useCallback(async () => {
    setFilters(initialFilters);
    setPage(1);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    router.replace(`?${params.toString()}`, { scroll: false });
    await fetchAndSetProducts(initialFilters, 1);
  }, [fetchAndSetProducts, router, searchParams]);

  // Handle page change
  const handlePageChange = useCallback(async (newPage: number) => {
    setPage(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
    await fetchAndSetProducts(undefined, newPage);
  }, [fetchAndSetProducts, router, searchParams]);

  // Handle page size change (optional)
  const handlePageSizeChange = useCallback(async (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    router.replace(`?${params.toString()}`, { scroll: false });
    await fetchAndSetProducts(undefined, 1, newPageSize);
  }, [fetchAndSetProducts, router, searchParams]);

  // Fetch products on mount and when filters/page/pageSize change
  useEffect(() => {
    fetchAndSetProducts();
  }, [filters, page, pageSize, fetchAndSetProducts]);

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
          <ProductFilters
            value={filters.name}
            onChange={debouncedNameFilterChange}
            status={filters.status}
            onStatusChange={(status: string) => handleFilterChange({ status })}
            type={filters.type}
            onTypeChange={(type: string) => handleFilterChange({ type })}
            stock={filters.stock}
            onStockChange={(stock: string) => handleFilterChange({ stock })}
          />
          <button
            className="btn btn-outline mt-2 w-full"
            type="button"
            onClick={handleResetFilters}
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
        {/* Add Product Section - blue card */}
        <div className="flex-1 bg-blue-50 border border-blue-300 rounded-lg p-4 flex flex-col md:flex-row md:items-end gap-4 min-w-[320px]">
          {/* Supplier select and AddProductDialog in one line */}
          <div className="flex flex-row items-center gap-3 w-full">
            <SupplierSelect value={filters.supplierId} onChange={(supplierId: string | null) => handleFilterChange({ supplierId })} onSupplierCount={setSupplierCount} />
            {filters.supplierId && supplierCount > 0 && (
              <div className="flex-1">
                <AddProductDialog supplierId={filters.supplierId} disabled={false} />
              </div>
            )}
          </div>
        </div>
      </div>
      <ProductTable
        page={page}
        pageSize={pageSize}
        products={filteredProducts !== null ? filteredProducts : []}
        total={total}
        loading={loading}
      />
      <PaginationControls
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
