import React from 'react';
import { getDashboardSummary } from '@/lib/dashboardSummary';

export default async function DashboardHome() {
  const summary = await getDashboardSummary();

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6 text-center">لوحة تحكم المتجر – ملخص سريع</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Orders */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-lg font-semibold">إجمالي الطلبات</span>
          <span className="text-3xl font-bold text-primary mt-2">{summary.orders.total}</span>
          <div className="flex gap-2 mt-2 text-sm">
            <span className="text-green-600">اليوم: {summary.orders.today}</span>
            <span className="text-yellow-600">معلق: {summary.orders.pending}</span>
            <span className="text-blue-600">مكتمل: {summary.orders.completed}</span>
            <span className="text-red-600">ملغي: {summary.orders.cancelled}</span>
          </div>
        </div>
        {/* Sales */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-lg font-semibold">إجمالي المبيعات (ر.س)</span>
          <span className="text-3xl font-bold text-primary mt-2">{summary.sales.total.toLocaleString('ar-EG')}</span>
          <span className="text-green-600 mt-2">اليوم: {summary.sales.today.toLocaleString('ar-EG')}</span>
        </div>
        {/* Customers */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-lg font-semibold">العملاء</span>
          <span className="text-3xl font-bold text-primary mt-2">{summary.customers.total}</span>
          <span className="text-green-600 mt-2">جدد اليوم: {summary.customers.today}</span>
        </div>
        {/* Products */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-lg font-semibold">المنتجات</span>
          <span className="text-3xl font-bold text-primary mt-2">{summary.products.total}</span>
          <span className="text-red-600 mt-2">منتهية: {summary.products.outOfStock}</span>
        </div>
        {/* Drivers */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-lg font-semibold">السائقون</span>
          <span className="text-3xl font-bold text-primary mt-2">{summary.drivers.total}</span>
        </div>
      </div>
      {/* Add more analytics widgets as needed */}
    </div>
  );
}
