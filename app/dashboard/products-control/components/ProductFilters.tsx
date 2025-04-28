import React from 'react';
import { Search } from 'lucide-react';

interface ProductFiltersProps {
  value: string;
  onChange: (name: string) => void;
  status: string;
  onStatusChange: (status: string) => void;
  type: string;
  onTypeChange: (type: string) => void;
  stock: string;
  onStockChange: (stock: string) => void;
}

export default function ProductFilters({ value, onChange, status, onStatusChange, type, onTypeChange, stock, onStockChange }: ProductFiltersProps) {
  return (
    <div className="w-full max-w-2xl">
      <p className="mb-1 text-xs text-muted-foreground select-none text-right">فلترة المنتجات (بحث، حالة المنتج، نوع المنتج، المخزون)</p>
      <div className="flex flex-wrap gap-2 bg-white rounded-lg shadow px-3 py-3 mb-2 items-center justify-end">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            className="form-input text-sm rounded border px-2 py-1 w-48"
            type="text"
            placeholder="بحث باسم المنتج..."
            value={value}
            onChange={e => onChange(e.target.value)}
          />
        </div>
        <select
          className="form-select text-sm rounded border px-2 py-1 min-w-[110px]"
          value={status}
          onChange={e => onStatusChange(e.target.value)}
        >
          <option value="all">كل الحالات</option>
          <option value="published">منشور</option>
          <option value="unpublished">غير منشور</option>
        </select>
        <select
          className="form-select text-sm rounded border px-2 py-1 min-w-[110px]"
          value={type}
          onChange={e => onTypeChange(e.target.value)}
        >
          <option value="all">كل الأنواع</option>
          <option value="company">مورد</option>
          <option value="offer">عرض</option>
        </select>
        <select
          className="form-select text-sm rounded border px-2 py-1 min-w-[110px]"
          value={stock}
          onChange={e => onStockChange(e.target.value)}
        >
          <option value="all">كل المخزون</option>
          <option value="in">متوفر</option>
          <option value="out">غير متوفر</option>
        </select>
      </div>
    </div>
  );
}
