"use client";
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { fetchCompany } from '@/app/dashboard/setting/actions/fetchCompany';
// Using the CSV export component instead of PDF
import ExportAnalyticsPdfButton from '@/components/ui/ExportAnalyticsPdfButton';

import AnalyticsChart from './AnalyticsChart';
import ChartTypeSwitcher from './ChartTypeSwitcher';
import ClientAnalyticsActions from './ClientAnalyticsActions';
import DateRangePicker from './DateRangePicker';
import ProductInfo from './ProductInfo';
import ProductOrderHistoryTable from './ProductOrderHistoryTable'; // Import the new component
import ProductRatingsSection from './ProductRatingsSection';

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
  const analyticsRef = useRef<HTMLDivElement>(null);
  const [company, setCompany] = useState<any>(null);

  useEffect(() => {
    fetchCompany().then(setCompany);
  }, []);

  // Optionally, you could refetch analytics here on date change via API if desired

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <ProductInfo product={analytics.product} />
        <div className="flex gap-2">
          <ExportAnalyticsPdfButton
            data={{
              productName: analytics?.product?.name || '',
              totalSales: analytics?.totalSales || 0,
              totalOrders: analytics?.totalOrders || 0,
              totalCustomers: analytics?.totalCustomers || 0, // Placeholder, not in analytics yet
              bestSeller: analytics?.product?.name || '', // For single product page
              salesByMonth: analytics?.salesByMonth?.map((m: any) => ({
                month: m.month,
                orders: m.orders || 0, // Placeholder, not in analytics yet
                sales: m.sales,
                revenue: m.revenue || 0 // Placeholder, not in analytics yet
              })) || [],
              orderHistory: analytics?.orderHistory?.map((order: any) => ({
                orderId: order.id,
                date: order.order?.createdAt ? new Date(order.order.createdAt).toLocaleDateString('ar-EG') : '',
                customer: order.order?.customerName || '', // Placeholder
                quantity: order.quantity,
                status: order.order?.status || '',
                price: order.price || 0
              })) || [],
            }}
            fileName={`تقرير-تحليلات-المنتج-${analytics?.product?.name || ''}`}
            company={company}
          />
          <ClientAnalyticsActions analytics={analytics} id={id} />
        </div>
      </div>
      <div ref={analyticsRef} dir="rtl">
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
                  <div className="text-2xl text-blue-600 font-bold">
                    {Number(analytics.totalSales).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-lg font-semibold mb-2">إجمالي الطلبات:</div>
                  <div className="text-2xl text-green-600 font-bold">{analytics.totalOrders}</div>
                </div>
              </div>
              <AnalyticsChart salesByMonth={analytics.salesByMonth} chartType={chartType} />
            </div>
            <ProductOrderHistoryTable data={analytics.orderHistory?.map((order: any) => ({
              date: order.order?.createdAt ? new Date(order.order.createdAt).toLocaleDateString('ar-EG') : '',
              orderId: order.orderId,
              orderNumber: order.order?.orderNumber || '',
              customer: order.order?.customerName || '',
              quantity: order.quantity,
              price: order.price || 0,
            })) || []} />
            <ProductRatingsSection />
          </>
        ) : (
          <div className="bg-white rounded-xl shadow p-6 min-h-[300px] flex flex-col items-center justify-center text-muted-foreground">
            لا توجد بيانات تحليلات متاحة لهذا المنتج.
          </div>
        )}
      </div>
    </>
  );
}
