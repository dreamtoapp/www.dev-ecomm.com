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
  let fromDate = dateFrom ? new Date(dateFrom) : undefined;
  let toDate = dateTo ? new Date(dateTo) : undefined;
  // If no range, default to all time (no filter)
  const orderItemWhere: any = { productId };
  if (fromDate && toDate) {
    orderItemWhere.order = { createdAt: { gte: fromDate, lte: toDate } };
  }
  // Total quantity sold for this product (filtered)
  const totalSalesAgg = await db.orderItem.aggregate({
    _sum: { quantity: true },
    where: orderItemWhere,
  });
  const totalOrders = await db.orderItem.count({ where: orderItemWhere });
  // Fetch all orderItems for this product in the date range (for chart and history)
  const orderItems = await db.orderItem.findMany({
    where: orderItemWhere,
    include: { order: true },
  });
  // Calculate total revenue (sum of quantity * price for all order items)
  const totalRevenue = orderItems.reduce((sum, oi) => sum + (oi.quantity * (oi.price || 0)), 0);
  // Group sales by month
  const months = [];
  let iter: Date;
  if (fromDate && toDate) {
    iter = new Date(fromDate);
    while (iter <= toDate) {
      months.push(new Date(iter));
      iter.setMonth(iter.getMonth() + 1);
    }
  } else if (orderItems.length > 0) {
    // If no filter, use earliest/latest order dates
    const itemsWithOrder = orderItems.filter(oi => oi.order && oi.order.createdAt);
    if (itemsWithOrder.length > 0) {
      const sorted = itemsWithOrder.slice().sort(
        (a, b) => new Date(a.order!.createdAt).getTime() - new Date(b.order!.createdAt).getTime()
      );
      let min = new Date(sorted[0].order!.createdAt);
      let max = new Date(sorted[sorted.length - 1].order!.createdAt);
      iter = new Date(min.getFullYear(), min.getMonth(), 1);
      while (iter <= max) {
        months.push(new Date(iter));
        iter.setMonth(iter.getMonth() + 1);
      }
    }
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
  // For history pagination, just return all filtered orderItems; paging is handled in frontend
  return {
    product: { ...product, supplier: supplier?.name || null },
    totalSales: totalRevenue, // إجمالي قيمة المبيعات بالريال
    totalOrders,
    salesByMonth,
    orderHistory: orderItems,
  };
}
