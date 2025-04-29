"use client";
import React, { useState } from "react";
import ProductInfo from "./ProductInfo";
import DateRangePicker from "./DateRangePicker";
import ChartTypeSwitcher from "./ChartTypeSwitcher";
import AnalyticsChart from "./AnalyticsChart";
import ClientAnalyticsActions from "./ClientAnalyticsActions";
import ProductRatingsSection from "./ProductRatingsSection";

export default function ClientAnalyticsDashboard({
  analytics,
  id,
  initialChartType = "bar",
  initialFrom = "",
  initialTo = ""
}: {
  analytics: any;
  id: string;
  initialChartType?: string;
  initialFrom?: string;
  initialTo?: string;
}) {
  const [chartType, setChartType] = useState(initialChartType);
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);

  // Optionally, you could refetch analytics here on date change via API if desired

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <ProductInfo product={analytics.product} />
        <ClientAnalyticsActions analytics={analytics} id={id} />
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <DateRangePicker onChange={(fromVal, toVal) => { setFrom(fromVal); setTo(toVal); /* trigger refetch if needed */ }} />
        <ChartTypeSwitcher type={chartType} onTypeChange={setChartType} />
      </div>
      <h1 className="text-2xl font-bold text-primary mb-6">تحليلات المنتج</h1>
      {analytics ? (
        <>
          <div className="bg-white rounded-xl shadow p-6 min-h-[300px]">
            <div className="flex flex-col md:flex-row md:gap-8 mb-8">
              <div className="flex-1 mb-4 md:mb-0">
                <div className="text-lg font-semibold mb-2">إجمالي المبيعات:</div>
                <div className="text-2xl text-blue-600 font-bold">{analytics.totalSales}</div>
              </div>
              <div className="flex-1">
                <div className="text-lg font-semibold mb-2">إجمالي الطلبات:</div>
                <div className="text-2xl text-green-600 font-bold">{analytics.totalOrders}</div>
              </div>
            </div>
            <AnalyticsChart salesByMonth={analytics.salesByMonth} chartType={chartType} />
          </div>
          <ProductRatingsSection />
        </>
      ) : (
        <div className="bg-white rounded-xl shadow p-6 min-h-[300px] flex flex-col items-center justify-center text-muted-foreground">
          لا توجد بيانات تحليلات متاحة لهذا المنتج.
        </div>
      )}
    </>
  );
}
