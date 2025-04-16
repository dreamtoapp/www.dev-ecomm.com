// app/dashboard/actions.ts
"use server";
// components/dashboard/actions.ts
import db from '@/lib/prisma';

export async function fetchAnalytics() {
  try {
    const allOrders = await db.order.findMany({
      select: {
        status: true, // Only need the status field for analytics
      },
    });

    // Calculate summary statistics in a single pass
    const {
      totalOrders,
      pendingOrders,
      deliveredOrders,
      inWaydOrders,
      canceledOrders,
    } = allOrders.reduce(
      (acc, order) => {
        acc.totalOrders++;
        if (order.status === "Pending") acc.pendingOrders++;
        else if (order.status === "Delivered") acc.deliveredOrders++;
        else if (order.status === "InWay") acc.inWaydOrders++;
        else if (order.status === "canceled") acc.canceledOrders++;
        return acc;
      },
      {
        totalOrders: 0,
        pendingOrders: 0,
        deliveredOrders: 0,
        inWaydOrders: 0,
        canceledOrders: 0,
      }
    );

    return {
      totalOrders,
      pendingOrders,
      deliveredOrders,
      inWaydOrders,
      canceledOrders,
    };
  } catch (error: any) {
    console.error("Error fetching analytics:", error);
    throw new Error("Failed to fetch analytics data.");
  }
}
