"use client";
import { useState, useRef } from 'react';
import KpiCards from './KpiCards';
import SalesChart from './SalesChart';
import SalesLineChart from './SalesLineChart';
import SalesPieChart from './SalesPieChart';
import TopProductsTable from './TopProductsTable';
import './sales-report-print.css';

interface Kpi {
  label: string;
  value: string;
  icon: string;
}
interface SalesData { day: string; value: number; }
interface Product { name: string; qty: number; unitPrice: number; total: number; }
interface TopProductsTotals { totalTopQty: number; totalTopSales: number; totalAllQty: number; totalAllSales: number; remaining: number; }

interface SalesReportClientProps {
  kpis: Kpi[];
  salesData: SalesData[];
  topProducts: Product[];
  allProducts: Product[];
  topProductsTotals: TopProductsTotals;
  initialFrom: string;
  initialTo: string;
  initialShowAll: boolean;
}

export default function SalesReportClient({ kpis, salesData, topProducts, allProducts, topProductsTotals, initialFrom, initialTo, initialShowAll }: SalesReportClientProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const [from, setFrom] = useState<string>(initialFrom);
  const [to, setTo] = useState<string>(initialTo);
  const [showAll, setShowAll] = useState(initialShowAll);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');

  // UX: If user picks a date, disable showAll
  function handleFromChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFrom(e.target.value);
    setShowAll(false);
  }
  function handleToChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTo(e.target.value);
    setShowAll(false);
  }
  function handleShowAllChange(e: React.ChangeEvent<HTMLInputElement>) {
    setShowAll(e.target.checked);
  }

  // Helper: Format current filter summary
  const filterSummary = showAll
    ? 'كل الفترات'
    : `من ${from.replace(/-/g, '/')} إلى ${to.replace(/-/g, '/')}`;

  // Print handler
  function handlePrint() {
    window.print();
  }

  return (
    <form method="GET" className="max-w-7xl mx-auto py-10 px-4 space-y-8" dir="rtl">
      <h1 className="text-3xl font-bold text-center mb-8">تقرير المبيعات</h1>
      {/* Print Button */}
      <div className="flex justify-end mb-2 print:hidden">
        <button type="button" onClick={handlePrint} className="px-4 py-2 rounded bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition">
          🖨️ طباعة التقرير
        </button>
      </div>
      <div ref={printRef} className="print:bg-white print:p-8 print:rounded print:shadow-none">
        {/* Filter Panel */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-end gap-4 mb-4 border border-gray-200">
          <div className="flex flex-col gap-2 md:flex-row md:items-center flex-1">
            <label className="flex items-center gap-2 font-medium">
              <span>كل الفترات</span>
              <span className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="showAll"
                  checked={showAll}
                  onChange={handleShowAllChange}
                  className="absolute block w-6 h-6 rounded-full bg-blue-500 border-4 appearance-none cursor-pointer transition-all checked:right-0 right-4"
                  style={{ right: showAll ? '0' : '4px' }}
                />
                <span className="block overflow-hidden h-6 rounded-full bg-gray-200"></span>
              </span>
            </label>
            <label className="font-medium">من:</label>
            <input
              type="date"
              name="from"
              value={from}
              onChange={handleFromChange}
              className="w-36 border rounded px-2 py-1"
              disabled={showAll}
            />
            <label className="font-medium">إلى:</label>
            <input
              type="date"
              name="to"
              value={to}
              onChange={handleToChange}
              className="w-36 border rounded px-2 py-1"
              disabled={showAll}
            />
          </div>
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">تحديث</button>
        </div>
        {/* Filter summary */}
        <div className="mb-6 text-center text-blue-800 text-lg font-medium">
          الحالة الحالية: {filterSummary}
        </div>
        {/* KPI Cards */}
        <KpiCards kpis={kpis} />
        {/* Chart type toggle */}
        <div className="flex justify-end gap-2 mb-2">
          <button
            type="button"
            className={`px-3 py-1 rounded font-medium border ${chartType==='bar' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`}
            onClick={() => setChartType('bar')}
          >مخطط أعمدة</button>
          <button
            type="button"
            className={`px-3 py-1 rounded font-medium border ${chartType==='line' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`}
            onClick={() => setChartType('line')}
          >مخطط خطي</button>
          <button
            type="button"
            className={`px-3 py-1 rounded font-medium border ${chartType==='pie' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`}
            onClick={() => setChartType('pie')}
          >مخطط دائري</button>
        </div>
        {/* Chart */}
        <div className="w-full">
          {chartType === 'bar' && <SalesChart salesData={salesData} filterSummary={filterSummary} />}
          {chartType === 'line' && <SalesLineChart salesData={salesData} filterSummary={filterSummary} />}
          {chartType === 'pie' && <SalesPieChart salesData={salesData} filterSummary={filterSummary} />}
        </div>
        {/* Top Products Table */}
        <div>
          <h2 className="text-lg font-bold mb-2">المنتجات الأكثر مبيعًا</h2>
          <TopProductsTable products={topProducts} totals={topProductsTotals} allProducts={allProducts} />
        </div>
      </div>
    </form>
  );
}
