"use client";
import React, { useRef } from 'react';

const REPORTS = [
  { key: 'sales', label: 'تقرير المبيعات', description: 'ملخص المبيعات والإيرادات والأداء المالي.' },
  { key: 'products', label: 'تقرير أداء المنتجات', description: 'أفضل وأسوأ المنتجات، المخزون، المرتجعات.' },
  { key: 'customers', label: 'تقرير العملاء', description: 'العملاء الجدد، العملاء الدائمون، المواقع الجغرافية.' },
  { key: 'orders', label: 'تحليلات الطلبات', description: 'حالات الطلبات، الأداء الزمني، الإلغاءات.' },
  { key: 'finance', label: 'التقارير المالية', description: 'تفصيل الإيرادات، المدفوعات، الخصومات والاسترداد.' },
  { key: 'inventory', label: 'تقرير المخزون', description: 'مستويات المخزون والتنبيهات.' },
  { key: 'promotions', label: 'تقرير العروض والتخفيضات', description: 'أداء الحملات ونسب التحويل.' },
  { key: 'drivers', label: 'تقرير السائقين والتوصيل', description: 'معدل التسليم، أرباح السائقين، الأداء.' },
  { key: 'reviews', label: 'تقرير التقييمات والمراجعات', description: 'ملخص التقييمات وتعليقات العملاء.' },
  { key: 'milestones', label: 'الإنجازات والأرقام القياسية', description: 'أهم الإنجازات الشهرية والتاريخية.' },
];

export default function ReportsPage() {
  const analyticsRef = useRef<HTMLDivElement>(null);
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex justify-end mb-4">
        {/* <DownloadDataButton targetRef={analyticsRef as React.RefObject<HTMLElement>} fileName="تقرير-التحليلات.csv" /> */}
      </div>
      <div ref={analyticsRef} dir="rtl">
        <h1 className="text-2xl font-bold mb-8 text-center">تقارير وتحليلات المتجر</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {REPORTS.map((report) => (
            <button
              key={report.key}
              className="rounded-xl shadow p-6 bg-white hover:bg-blue-50 border border-blue-100 flex flex-col items-start transition group focus:outline-none focus:ring-2 focus:ring-blue-400"
              // onClick={() => router.push(`/dashboard/reports/${report.key}`)}
              disabled
            >
              <span className="text-lg font-bold text-blue-700 mb-2 group-hover:text-blue-900 transition">{report.label}</span>
              <span className="text-gray-500 text-sm">{report.description}</span>
            </button>
          ))}
        </div>
        <div className="mt-8 text-center text-gray-400 text-xs">
          سيتم تفعيل كل تقرير على حدة قريبًا.
        </div>
      </div>
    </div>
  );
}