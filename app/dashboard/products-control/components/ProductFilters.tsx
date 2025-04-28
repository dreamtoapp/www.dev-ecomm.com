import React from 'react';
import { Search, Undo2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';

interface ProductFiltersProps {
  value: string;
  onChange: (name: string) => void;
  status: string;
  onStatusChange: (status: string) => void;
  type: string;
  onTypeChange: (type: string) => void;
  stock: string;
  onStockChange: (stock: string) => void;
  onReset?: () => void; // Optional reset handler
}

export default function ProductFilters({ value, onChange, status, onStatusChange, type, onTypeChange, stock, onStockChange, onReset }: ProductFiltersProps) {
  return (
    <div className="w-full">
      <p className="mb-1 text-xs text-muted-foreground select-none text-right">فلترة المنتجات (بحث، حالة المنتج، نوع المنتج، المخزون)</p>
      <div className="flex flex-wrap gap-2 bg-white rounded-lg shadow px-3 py-3 mb-2 items-center justify-end">
        {/* Search input fills remaining space */}
        <div className="flex items-center gap-2 flex-1 min-w-[180px]">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            className="form-input text-sm rounded border px-2 py-2 w-full focus:ring-2 focus:ring-primary"
            type="text"
            placeholder="بحث باسم المنتج..."
            value={value}
            onChange={e => onChange(e.target.value)}
            style={{ direction: 'rtl' }}
          />
        </div>
        {/* Status filter */}
        <select
          className="form-select text-sm rounded border px-2 py-2 min-w-[110px]"
          value={status}
          onChange={e => onStatusChange(e.target.value)}
        >
          <option value="all">كل الحالات</option>
          <option value="published">منشور</option>
          <option value="unpublished">غير منشور</option>
        </select>
        {/* Type filter */}
        <select
          className="form-select text-sm rounded border px-2 py-2 min-w-[110px]"
          value={type}
          onChange={e => onTypeChange(e.target.value)}
        >
          <option value="all">كل الأنواع</option>
          <option value="company">مورد</option>
          <option value="offer">عرض</option>
        </select>
        {/* Stock filter */}
        <select
          className="form-select text-sm rounded border px-2 py-2 min-w-[110px]"
          value={stock}
          onChange={e => onStockChange(e.target.value)}
        >
          <option value="all">كل المخزون</option>
          <option value="in">متوفر</option>
          <option value="out">غير متوفر</option>
        </select>
        {/* Reset button as icon with tooltip */}
        {onReset && (
          <Tooltip>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-primary hover:bg-primary/10"
              title="إعادة تعيين الفلاتر"
              onClick={onReset}
            >
              <Undo2 className="w-5 h-5" />
              <span className="sr-only">إعادة تعيين الفلاتر</span>
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
