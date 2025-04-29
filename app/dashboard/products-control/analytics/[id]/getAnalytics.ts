"use server";
import db from '@/lib/prisma';

export async function getProductAnalytics(productId: string, dateFrom?: string, dateTo?: string) {
  // Fetch product info (only fields that exist in your Product model)
  const product = await db.product.findUnique({
    where: { id: productId },
    select: { id: true, name: true, imageUrl: true, price: true, outOfStock: true, supplierId: true },
  });
  // Fetch supplier name if supplierId exists
  let supplier = null;
  if (product?.supplierId) {
    supplier = await db.supplier.findUnique({ where: { id: product.supplierId }, select: { name: true } });
  }
  // Date range logic
  const fromDate = dateFrom ? new Date(dateFrom) : new Date(new Date().getFullYear(), new Date().getMonth() - 11, 1);
  const toDate = dateTo ? new Date(dateTo) : new Date();
  // Total quantity sold for this product
  const totalSalesAgg = await db.orderItem.aggregate({
    _sum: { quantity: true },
    where: { productId },
  });
  const totalOrders = await db.orderItem.count({ where: { productId } });
  // Fetch all orderItems for this product in the date range
  const orderItems = await db.orderItem.findMany({
    where: {
      productId,
      order: { createdAt: { gte: fromDate, lte: toDate } },
    },
    include: { order: true },
  });
  // Group sales by month
  const months = [];
  let iter = new Date(fromDate);
  while (iter <= toDate) {
    months.push(new Date(iter));
    iter.setMonth(iter.getMonth() + 1);
  }
  const salesByMonth = months.map((monthDate, idx) => {
    const nextMonth = new Date(monthDate);
    nextMonth.setMonth(monthDate.getMonth() + 1);
    const month = monthDate.toLocaleString('default', { year: 'numeric', month: '2-digit' });
    const sales = orderItems.filter(oi => {
      const created = oi.order?.createdAt;
      return created && created >= monthDate && created < nextMonth;
    }).reduce((sum, oi) => sum + (oi.quantity || 0), 0);
    return { month, sales };
  });
  return {
    product: { ...product, supplier: supplier?.name || null },
    totalSales: totalSalesAgg._sum.quantity || 0,
    totalOrders,
    salesByMonth,
  };
}
