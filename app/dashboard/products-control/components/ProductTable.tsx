import React from 'react';
import ProductTableClientActions from "./ProductTableClientActions";
import { Skeleton } from "@/components/ui/skeleton";

interface Supplier {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  size?: string;
  details?: string;
  imageUrl?: string;
  supplier?: Supplier;
  published: boolean;
  outOfStock: boolean;
}

interface ProductTableProps {
  page: number;
  pageSize: number;
  products: Product[];
  total: number;
  loading?: boolean;
  onDeleted?: () => void;
}

export default function ProductTable({ page, pageSize, products, total, loading, onDeleted }: ProductTableProps) {
  if (loading) {
    return (
      <div className="overflow-x-auto border rounded-lg bg-white shadow-sm">
        <table className="min-w-full text-sm rtl text-right">
          <thead className="bg-accent">
            <tr>
              <th className="py-3 px-4">الصورة</th>
              <th className="py-3 px-4">اسم المنتج</th>
              <th className="py-3 px-4">السعر</th>
              <th className="py-3 px-4">الحجم</th>
              <th className="py-3 px-4">التفاصيل</th>
              <th className="py-3 px-4">المورد</th>
              <th className="py-3 px-4">الحالة</th>
              <th className="py-3 px-4">الكمية</th>
              <th className="py-3 px-4">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(pageSize)].map((_, i) => (
              <tr key={i}>
                {Array(9).fill(0).map((_, j) => (
                  <td key={j} className="py-2 px-4">
                    <Skeleton className="h-5 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (!loading && (!products || products.length === 0)) {
    return <div className="flex items-center justify-center min-h-[200px] text-muted-foreground">لا توجد منتجات</div>;
  }
  return (
    <div className="overflow-x-auto border rounded-lg bg-white shadow-sm">
      <table className="min-w-full text-sm rtl text-right">
        <thead className="bg-accent">
          <tr>
            <th className="py-3 px-4">الصورة</th>
            <th className="py-3 px-4">اسم المنتج</th>
            <th className="py-3 px-4">السعر</th>
            <th className="py-3 px-4">الحجم</th>
            <th className="py-3 px-4">التفاصيل</th>
            <th className="py-3 px-4">المورد</th>
            <th className="py-3 px-4">الحالة</th>
            <th className="py-3 px-4">الكمية</th>
            <th className="py-3 px-4">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: Product) => (
            <tr key={product.id}>
              <td className="py-2 px-4">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded" />
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </td>
              <td className="py-2 px-4 font-medium">{product.name}</td>
              <td className="py-2 px-4">{product.price.toLocaleString()} ر.س</td>
              <td className="py-2 px-4">{product.size || '-'}</td>
              <td className="py-2 px-4">{product.details || '-'}</td>
              <td className="py-2 px-4">{product.supplier?.name || '-'}</td>
              <td className="py-2 px-4">
                {product.published ? (
                  <span className="inline-block px-2 py-1 text-xs rounded bg-green-100 text-green-800">منشور</span>
                ) : (
                  <span className="inline-block px-2 py-1 text-xs rounded bg-gray-200 text-gray-600">غير منشور</span>
                )}
              </td>
              <td className="py-2 px-4">{product.outOfStock ? 'غير متوفر' : 'متوفر'}</td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex gap-2">
                <ProductTableClientActions product={product} onDeleted={onDeleted} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
