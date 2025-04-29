"use client";
import React, { useRef } from 'react';
import DownloadPdfButton from '@/components/ui/DownloadPdfButton';

export default function ReportsPage() {
  const analyticsRef = useRef<HTMLDivElement>(null);
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex justify-end mb-4">
        <DownloadPdfButton targetRef={analyticsRef as React.RefObject<HTMLElement>} fileName="تقرير-التحليلات.pdf" />
      </div>
      <div ref={analyticsRef} dir="rtl">
        <h1 className="text-2xl font-bold mb-8 text-center">تقارير وتحليلات المتجر</h1>
        <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
          <p className="text-gray-600 text-lg text-center">
            سيتم عرض تقارير وتحليلات الأداء هنا قريبًا.
          </p>
        </div>
      </div>
    </div>
  );
}