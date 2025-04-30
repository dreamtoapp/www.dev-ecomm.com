import React, { useState } from 'react';

interface Product {
  name: string;
  qty: number;
  unitPrice: number;
  total: number;
}

interface TopProductsTotals {
  totalTopQty: number;
  totalTopSales: number;
  totalAllQty: number;
  totalAllSales: number;
  remaining: number;
}

function formatNumber(val: number | undefined | null) {
  if (val === null || val === undefined) return '-';
  return val.toLocaleString('ar-EG');
}

export default function TopProductsTable({ products, totals, allProducts }: { products: Product[]; totals: TopProductsTotals; allProducts: Product[] }) {
  const [showAll, setShowAll] = useState(false);
  const displayProducts = showAll ? allProducts : products;
  const sumQty = displayProducts.reduce((sum, p) => sum + (p.qty || 0), 0);
  const sumTotal = displayProducts.reduce((sum, p) => sum + (p.total || 0), 0);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="px-4 py-2 text-right">المنتج</th>
            <th className="px-4 py-2 text-right">الكمية</th>
            <th className="px-4 py-2 text-right">سعر الوحدة</th>
            <th className="px-4 py-2 text-right">الإجمالي</th>
          </tr>
        </thead>
        <tbody>
          {displayProducts.map((p, i) => (
            <tr key={i}>
              <td className="px-4 py-2 border-b">{p.name}</td>
              <td className="px-4 py-2 border-b">{formatNumber(p.qty)}</td>
              <td className="px-4 py-2 border-b">{formatNumber(p.unitPrice)}</td>
              <td className="px-4 py-2 border-b">{formatNumber(p.total)}</td>
            </tr>
          ))}
          {/* Totals row */}
          <tr className="bg-blue-50 font-bold">
            <td className="px-4 py-2 border-b">الإجمالي</td>
            <td className="px-4 py-2 border-b">{formatNumber(sumQty)}</td>
            <td className="px-4 py-2 border-b"></td>
            <td className="px-4 py-2 border-b">{formatNumber(sumTotal)}</td>
          </tr>
          {/* Show All button */}
          {!showAll && totals.remaining > 0 && (
            <tr className="bg-yellow-50">
              <td colSpan={4} className="text-center">
                <button
                  className="px-4 py-1 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
                  onClick={e => { e.preventDefault(); setShowAll(true); }}
                >عرض الكل ({formatNumber(totals.remaining)} منتج آخر)</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
