import db from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function getProductPerformanceData({ from, to }: { from?: string, to?: string }) {
  // Parse date filters if provided
  let dateFilter: Prisma.OrderWhereInput = {};
  if (from || to) {
    dateFilter = {
      createdAt: {
        ...(from ? { gte: new Date(from) } : {}),
        ...(to ? { lte: new Date(to) } : {}),
      },
    };
  }

  // Get all products
  const products = await db.product.findMany({
    include: {
      supplier: true,
      orderItems: {
        include: {
          order: true,
        },
      },
    },
  });

  // Aggregate sales data per product
  const productPerformance = products.map((product) => {
    // Filter orderItems by date (if provided)
    const filteredOrderItems = product.orderItems.filter((item) => {
      if (!item.order) return false;
      const createdAt = new Date(item.order.createdAt);
      if (from && createdAt < new Date(from)) return false;
      if (to && createdAt > new Date(to)) return false;
      return true;
    });
    const quantitySold = filteredOrderItems.reduce((sum, item) => sum + (item.quantity ?? 0), 0);
    const revenue = filteredOrderItems.reduce((sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 0), 0);
    const orderCount = new Set(filteredOrderItems.map((item) => item.orderId)).size;
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl ?? undefined,
      supplierName: product.supplier?.name ?? undefined,
      published: product.published,
      outOfStock: product.outOfStock,
      quantitySold,
      revenue,
      orderCount,
    };
  });

  // KPIs (Arabic labels, 2 decimal for revenue)
  const totalProductsSold = productPerformance.reduce((sum, p) => sum + p.quantitySold, 0);
  const totalRevenue = productPerformance.reduce((sum, p) => sum + p.revenue, 0);
  const bestSeller = productPerformance.reduce((best, p) => (p.quantitySold > (best?.quantitySold ?? 0) ? p : best), undefined as any);

  const kpis = [
    { label: 'إجمالي المنتجات المباعة', value: totalProductsSold },
    { label: 'إجمالي الإيرادات', value: totalRevenue.toFixed(2) },
    { label: 'الأكثر مبيعًا', value: bestSeller ? bestSeller.name : '-' },
    { label: 'إجمالي المنتجات', value: products.length },
  ];

  // Chart Data
  const chartData = productPerformance.map((p) => ({
    name: p.name,
    quantitySold: p.quantitySold,
    revenue: p.revenue,
  }));

  return {
    products: productPerformance,
    kpis,
    chartData,
  };
}
