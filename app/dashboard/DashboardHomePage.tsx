"use client";
import React from 'react';

import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import Link from '@/components/link';

interface DashboardHomePageProps {
  summary: {
    orders: { total: number; today: number; pending: number; completed: number; cancelled: number };
    sales: { total: number; today: number };
    customers: { total: number; today: number };
    products: { total: number; outOfStock: number };
    drivers: { total: number };
    salesByMonth: { name: string; sales: number }[];
    topProducts: { name: string; sales: number; quantity: number }[];
    orderStatus: { name: string; value: number }[];
    recentOrders: { id: string; customer: string; amount: number; status: string; date: string }[];
  };
}

const COLORS = ["#2563eb", "#22c55e", "#f59e42", "#ef4444", "#a21caf", "#0ea5e9"];

// Helper to show numbers in English
function formatNumberEn(num: number) {
  return num.toLocaleString("en-US");
}

export default function DashboardHomePage({ summary }: DashboardHomePageProps) {
  return (
    <div className="container mx-auto py-8" dir="rtl">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="rounded-xl p-4 flex flex-col items-center shadow-sm bg-blue-100 text-blue-700">
          <span className="text-3xl mb-2">📦</span>
          <span className="text-2xl font-bold">{formatNumberEn(summary.orders.total)}</span>
          <span className="text-sm font-medium mt-1">إجمالي الطلبات</span>
        </div>
        <div className="rounded-xl p-4 flex flex-col items-center shadow-sm bg-green-100 text-green-700">
          <span className="text-3xl mb-2">💰</span>
          <span className="text-2xl font-bold">{formatNumberEn(summary.sales.total)}</span>
          <span className="text-sm font-medium mt-1">إجمالي المبيعات (ر.س)</span>
        </div>
        <div className="rounded-xl p-4 flex flex-col items-center shadow-sm bg-yellow-100 text-yellow-700">
          <span className="text-3xl mb-2">👤</span>
          <span className="text-2xl font-bold">{formatNumberEn(summary.customers.total)}</span>
          <span className="text-sm font-medium mt-1">العملاء</span>
        </div>
        <div className="rounded-xl p-4 flex flex-col items-center shadow-sm bg-purple-100 text-purple-700">
          <span className="text-3xl mb-2">🛒</span>
          <span className="text-2xl font-bold">{formatNumberEn(summary.products.total)}</span>
          <span className="text-sm font-medium mt-1">المنتجات</span>
        </div>
        <div className="rounded-xl p-4 flex flex-col items-center shadow-sm bg-red-100 text-red-700">
          <span className="text-3xl mb-2">⚠️</span>
          <span className="text-2xl font-bold">{formatNumberEn(summary.products.outOfStock)}</span>
          <span className="text-sm font-medium mt-1">غير متوفر</span>
        </div>
        <div className="rounded-xl p-4 flex flex-col items-center shadow-sm bg-pink-100 text-pink-700">
          <span className="text-3xl mb-2">🏢</span>
          <span className="text-2xl font-bold">{formatNumberEn(summary.drivers.total)}</span>
          <span className="text-sm font-medium mt-1">السائقون</span>
        </div>
      </div>

      {/* تفاصيل الطلبات */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">تفاصيل الطلبات</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          <span className="text-green-600 font-semibold">اليوم: {formatNumberEn(summary.orders.today)}</span>
          <span className="text-yellow-600 font-semibold">معلق: {formatNumberEn(summary.orders.pending)}</span>
          <span className="text-blue-600 font-semibold">مكتمل: {formatNumberEn(summary.orders.completed)}</span>
          <span className="text-red-600 font-semibold">ملغي: {formatNumberEn(summary.orders.cancelled)}</span>
        </div>
      </div>

      {/* تفاصيل العملاء والمبيعات */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">تفاصيل العملاء والمبيعات</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          <span className="text-green-600 font-semibold">عملاء جدد اليوم: {formatNumberEn(summary.customers.today)}</span>
          <span className="text-green-600 font-semibold">مبيعات اليوم: {formatNumberEn(summary.sales.today)}</span>
        </div>
      </div>

      {/* Sales Over Time Chart */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">المبيعات على مدار الشهور</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={summary.salesByMonth} layout="horizontal">
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={v => [formatNumberEn(v as number), "ر.س"]} />
            <Bar dataKey="sales" fill="#2563eb" name="المبيعات" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">المنتجات الأكثر مبيعًا</h2>
        <ul className="divide-y">
          {summary.topProducts.map((p, i) => (
            <li key={i} className="flex items-center justify-between py-3">
              <span className="font-medium">{p.name}</span>
              <span className="text-blue-700 font-bold">{formatNumberEn(p.sales)}</span>
              <span className="text-gray-500">({formatNumberEn(p.quantity)} قطعة)</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Order Status Pie Chart */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">حالة الطلبات</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={summary.orderStatus} cx="50%" cy="50%" outerRadius={80} fill="#2563eb" dataKey="value" label>
              {summary.orderStatus.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">أحدث الطلبات</h2>
        <table className="min-w-full text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4">رقم الطلب</th>
              <th className="py-2 px-4">العميل</th>
              <th className="py-2 px-4">المبلغ</th>
              <th className="py-2 px-4">الحالة</th>
              <th className="py-2 px-4">التاريخ</th>
            </tr>
          </thead>
          <tbody>
            {summary.recentOrders.map((o) => (
              <tr key={o.id} className="border-b">
                <td className="py-2 px-4">{o.id.slice(-6)}</td>
                <td className="py-2 px-4">{o.customer}</td>
                <td className="py-2 px-4">{formatNumberEn(o.amount)}</td>
                <td className="py-2 px-4">{o.status}</td>
                <td className="py-2 px-4">{new Date(o.date).toLocaleDateString('en-US')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/dashboard/products-control/add" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-primary/90 transition">إضافة منتج جديد</Link>
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-green-700 transition">تصدير التقارير</button>
      </div>
    </div>
  );
}
