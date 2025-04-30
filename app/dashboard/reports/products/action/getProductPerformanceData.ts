import db from '@/lib/prisma';

export async function getProductPerformanceData({ from, to }: { from?: string, to?: string }) {
  // TODO: تنفيذ منطق التجميع لاحقاً
  return {
    products: [],
    kpis: [],
    chartData: [],
  };
}
