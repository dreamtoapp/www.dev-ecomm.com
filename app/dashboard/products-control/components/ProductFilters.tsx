import React from 'react';

export default function ProductFilters() {
  // Placeholder - will implement filter controls (search, supplier, status)
  return (
    <div className="flex flex-wrap gap-4 mb-4 items-center">
      <input
        className="input input-bordered w-full max-w-xs"
        placeholder="بحث باسم المنتج..."
        type="text"
        // TODO: implement onChange
      />
      {/* TODO: Supplier dropdown, status toggles */}
      <span className="text-muted-foreground">(تصفية متقدمة قريباً)</span>
    </div>
  );
}
