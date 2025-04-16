import {
  fetchAnalytics,
  fetchOrders,
} from './action/actions';
import DashboardHeader from './component/DashboardHeader';
import OrderCardView from './component/OrderCardView';

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
      <OrderCardView orders={filteredOrders} />
    </div>
  );
}
