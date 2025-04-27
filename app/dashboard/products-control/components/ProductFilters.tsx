import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import AdvancedProductFiltersModal from './AdvancedProductFiltersModal';

export default function ProductFilters({ ...props }) {
  // For advanced filters modal
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({});

  function handleAdvancedApply(filters: any) {
    setAdvancedFilters(filters);
    setAdvancedOpen(false);
  }

  return (
    <div className="w-full max-w-md">
      {/* Hint above filter box, matching supplier box */}
      <p className="mb-1 text-xs text-muted-foreground select-none">يرجى استخدام الفلتر للبحث المتقدم عن المنتجات</p>
      <div className="flex items-center gap-2 bg-white border border-muted rounded-lg px-3 py-2 shadow-sm w-full max-w-md">
        <input
          type="text"
          className="flex-1 bg-transparent outline-none border-none text-sm placeholder:text-muted-foreground"
          placeholder="بحث باسم المنتج..."
          {...props}
        />
        <button
          className="btn btn-outline px-2 py-1 h-8 min-w-0 flex gap-1 items-center text-xs"
          type="button"
          onClick={() => setAdvancedOpen(true)}
        >
          <SlidersHorizontal className="w-4 h-4" />
          تصفية متقدمة
        </button>
      </div>
      <AdvancedProductFiltersModal
        open={advancedOpen}
        onClose={() => setAdvancedOpen(false)}
        onApply={handleAdvancedApply}
        initialFilters={advancedFilters}
      />
    </div>
  );
}
