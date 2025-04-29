import AnalyticsChart from "./AnalyticsChart";
import { getProductAnalytics } from "./getAnalytics";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ClientAnalyticsDashboard from "./ClientAnalyticsDashboard";
import ProductNotFound from "./ProductNotFound";
import { notFound } from "next/navigation";

function isValidObjectId(id: string) {
  return /^[a-f\d]{24}$/i.test(id);
}

export default async function ProductAnalyticsPage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams?: Promise<{ from?: string, to?: string, chartType?: string }> }) {
  const { id } = await params;
  if (!isValidObjectId(id)) {
    return <ProductNotFound />;
  }
  const { from, to, chartType } = searchParams ? await searchParams : {};
  const analytics = await getProductAnalytics(id, from, to);
  if (!analytics?.product) {
    return <ProductNotFound />;
  }

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
