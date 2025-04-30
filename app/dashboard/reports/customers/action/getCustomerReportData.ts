import db from '@/lib/prisma';

/**
 * احصائيات العملاء: العدد الإجمالي، العملاء الجدد، العملاء الدائمين، الأعلى طلباً، الأعلى إنفاقاً، بيانات للرسم البياني.
 */
export async function getCustomerReportData({ from, to }: { from?: string, to?: string }) {
  // تاريخ الفلترة للطلبات
  let orderDateFilter: any = {};
  if (from || to) {
    orderDateFilter = {
      createdAt: {
        ...(from ? { gte: new Date(from) } : {}),
        ...(to ? { lte: new Date(to) } : {}),
      },
    };
  }

  // جلب جميع المستخدمين مع الطلبات
  const users = await db.user.findMany({
    include: {
      orders: {
        where: orderDateFilter,
        include: {
          items: true,
        },
      },
    },
  });

  // معالجة بيانات العملاء
  const customers = users.map((user) => {
    const orderCount = user.orders.length;
    const totalSpend = user.orders.reduce((sum, o) => sum + (o.amount ?? 0), 0);
    return {
      id: user.id,
      name: user.name ?? '-',
      phone: user.phone ?? '-',
      email: user.email ?? '-',
      orderCount,
      totalSpend,
      createdAt: user.createdAt,
    };
  });

  // KPIs
  const totalCustomers = customers.length;
  const totalOrders = customers.reduce((sum, c) => sum + c.orderCount, 0);
  const totalSpendAll = customers.reduce((sum, c) => sum + c.totalSpend, 0);
  // الأعلى طلباً
  const topCustomer = customers.reduce((best, c) => (c.orderCount > (best?.orderCount ?? 0) ? c : best), undefined as any);
  // الأعلى إنفاقاً
  const topSpender = customers.reduce((best, c) => (c.totalSpend > (best?.totalSpend ?? 0) ? c : best), undefined as any);

  // رسم بياني: اسم العميل وعدد الطلبات
  const chartData = customers.map((c) => ({
    name: c.name,
    orderCount: c.orderCount,
    totalSpend: c.totalSpend,
  })).sort((a, b) => b.orderCount - a.orderCount).slice(0, 10); // أعلى 10 فقط

  const kpis = [
    { label: 'إجمالي العملاء', value: totalCustomers },
    { label: 'إجمالي الطلبات', value: totalOrders },
    { label: 'إجمالي الإنفاق', value: totalSpendAll.toFixed(2) },
    { label: 'الأكثر طلباً', value: topCustomer ? topCustomer.name : '-' },
    { label: 'الأعلى إنفاقاً', value: topSpender ? topSpender.name : '-' },
  ];

  return {
    customers,
    kpis,
    chartData,
  };
}
