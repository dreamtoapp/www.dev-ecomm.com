import React, { useState } from 'react';
import SupplierSelect from './SupplierSelect';
import { X } from 'lucide-react';
import { toast } from 'sonner';

interface AdvancedProductFiltersModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  initialFilters: any;
}

export default function AdvancedProductFiltersModal({ open, onClose, onApply, initialFilters }: AdvancedProductFiltersModalProps) {
  const [status, setStatus] = useState(initialFilters.status || 'all');
  const [stock, setStock] = useState(initialFilters.stock || 'all');
  const [priceMin, setPriceMin] = useState(initialFilters.priceMin || '');
  const [priceMax, setPriceMax] = useState(initialFilters.priceMax || '');
  const [supplierType, setSupplierType] = useState(initialFilters.supplierType || 'all');
  const [supplierId, setSupplierId] = useState(initialFilters.supplierId || null);

  function handleApply() {
    onApply({ status, stock, priceMin, priceMax, supplierType, supplierId });
    toast.success('تم تطبيق التصفية!');
    onClose();
  }

  function handleReset() {
    setStatus('all');
    setStock('all');
    setPriceMin('');
    setPriceMax('');
    setSupplierType('all');
    setSupplierId(null);
    toast.info('تمت إعادة التصفية للوضع الافتراضي');
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-xl p-8 relative animate-in fade-in border border-muted">
        <button className="absolute left-6 top-6 text-muted-foreground hover:text-primary transition" onClick={onClose} aria-label="إغلاق">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold mb-2 text-primary text-center tracking-tight">تصفية متقدمة</h2>
        <p className="text-center text-muted-foreground mb-8 text-sm">اختر ما يناسبك من التصفية، ويمكنك العودة للوضع الافتراضي في أي وقت.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-muted-foreground">المورد</label>
            <SupplierSelect value={supplierId} onChange={setSupplierId} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-muted-foreground">الحالة</label>
            <select className="input input-bordered w-full bg-blue-50 border-blue-300 focus:border-blue-500 focus:ring-blue-200 transition-colors duration-150" value={status} onChange={e => setStatus(e.target.value)}>
              <option value="all">الكل</option>
              <option value="published">منشور</option>
              <option value="unpublished">غير منشور</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-muted-foreground">المخزون</label>
            <select className="input input-bordered w-full bg-blue-50 border-blue-300 focus:border-blue-500 focus:ring-blue-200 transition-colors duration-150" value={stock} onChange={e => setStock(e.target.value)}>
              <option value="all">الكل</option>
              <option value="in">متوفر</option>
              <option value="out">غير متوفر</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-muted-foreground">نطاق السعر</label>
            <div className="flex gap-2">
              <input className="input input-bordered w-20 bg-blue-50 border-blue-300 focus:border-blue-500 focus:ring-blue-200 transition-colors duration-150" type="number" min="0" placeholder="من" value={priceMin} onChange={e => setPriceMin(e.target.value)} />
              <span className="text-xs text-muted-foreground">-</span>
              <input className="input input-bordered w-20 bg-blue-50 border-blue-300 focus:border-blue-500 focus:ring-blue-200 transition-colors duration-150" type="number" min="0" placeholder="إلى" value={priceMax} onChange={e => setPriceMax(e.target.value)} />
            </div>
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-xs font-medium text-muted-foreground">نوع المورد</label>
            <select className="input input-bordered w-full max-w-xs bg-blue-50 border-blue-300 focus:border-blue-500 focus:ring-blue-200 transition-colors duration-150" value={supplierType} onChange={e => setSupplierType(e.target.value)}>
              <option value="all">الكل</option>
              <option value="regular">مورد عادي</option>
              <option value="offer">عرض</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-3 justify-start mt-2">
          <button className="btn btn-primary min-w-[120px]" onClick={handleApply}>تطبيق التصفية</button>
          <button className="btn btn-outline min-w-[100px]" onClick={onClose}>إلغاء</button>
          <button className="btn btn-link text-blue-600 hover:underline" onClick={handleReset}>إعادة للوضع الافتراضي</button>
        </div>
      </div>
    </div>
  );
}
