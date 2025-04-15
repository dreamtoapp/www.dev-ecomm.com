import PusherNotify from '@/app/dashboard/(dashboard)/component/pusherNotifaction/PusherNotify';

import {
  fetchAnalytics,
  fetchOrders,
} from './action/actions';
import DashboardHeader from './component/DashboardHeader';
// app/dashboard/page.tsx
import OrderList from './component/OrdersList';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const statusFilter = resolvedSearchParams.status;

  const filteredOrders = await fetchOrders(statusFilter);
  const {
    totalOrders,
    pendingOrders,
    deliveredOrders,
    inWaydOrders,
    canceledOrders,
  } = await fetchAnalytics();

  return (
    <div className="relative space-y-6 font-cairo p-4 flex flex-col ">
      {/* Header */}
      <PusherNotify />
      <DashboardHeader
        initialFilter={statusFilter || "All"}
        totalOrders={totalOrders}
        pendingOrders={pendingOrders}
        deliveredOrders={deliveredOrders}
        inWayOrders={inWaydOrders}
        cancelOrders={canceledOrders}
      />

      {/* Pass all orders to OrderCard */}
      {/* @ts-ignore */}
      <OrderList orders={filteredOrders} />
    </div>
  );
}
