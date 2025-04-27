// Dashboard analytics summary utilities
import db from '@/lib/prisma';

export async function getDashboardSummary() {
  // Orders
  const totalOrders = await db.order.count();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const ordersToday = await db.order.count({ where: { createdAt: { gte: today } } });
  const pendingOrders = await db.order.count({ where: { status: 'Pending' } });
  const completedOrders = await db.order.count({ where: { status: 'Completed' } });
  const cancelledOrders = await db.order.count({ where: { status: 'Cancelled' } });

  // Sales
  const totalSales = await db.order.aggregate({ _sum: { amount: true } });
  const salesToday = await db.order.aggregate({ _sum: { amount: true }, where: { createdAt: { gte: today } } });

  // Customers
  const totalCustomers = await db.user.count({ where: { role: 'customer' } });
  const newCustomersToday = await db.user.count({ where: { role: 'customer', createdAt: { gte: today } } });

  // Products
  const totalProducts = await db.product.count();
  const outOfStockProducts = await db.product.count({ where: { outOfStock: true } });

  // Drivers
  const totalDrivers = await db.driver.count();

  return {
    orders: { total: totalOrders, today: ordersToday, pending: pendingOrders, completed: completedOrders, cancelled: cancelledOrders },
    sales: { total: totalSales._sum.amount || 0, today: salesToday._sum.amount || 0 },
    customers: { total: totalCustomers, today: newCustomersToday },
    products: { total: totalProducts, outOfStock: outOfStockProducts },
    drivers: { total: totalDrivers },
  };
}
