import AnalyticsChart from "./AnalyticsChart";
import { getProductAnalytics } from "./getAnalytics";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ClientAnalyticsDashboard from "./ClientAnalyticsDashboard";

export default async function ProductAnalyticsPage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams?: Promise<{ from?: string, to?: string, chartType?: string }> }) {
  const { id } = await params;
  const { from, to, chartType } = searchParams ? await searchParams : {};
  const analytics = await getProductAnalytics(id, from, to);

  return (
    <div className="container mx-auto py-8" dir="rtl">
      <div className="mb-4">
        <Link href="/dashboard/products-control" className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition font-medium border border-muted rounded-lg px-3 py-1 bg-white shadow-sm">
          <ArrowRight className="w-4 h-4" />
          <span>رجوع للمنتجات</span>
        </Link>
      </div>
      <ClientAnalyticsDashboard analytics={analytics} id={id} initialChartType={chartType || 'bar'} initialFrom={from || ''} initialTo={to || ''} />
    </div>
  );
}
