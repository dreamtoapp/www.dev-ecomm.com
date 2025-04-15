"use client";
import React, { useCallback, useEffect, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Order } from "../helper/cardType";
import OrderCardView from "./OrderCardView";
import OrderTableView from "./OrderTableView";
import Pusher from "pusher-js";
import { fetchOrders } from "../action/actions";

const OrderViewSwitcher = ({
  viewMode,
  toggleViewMode,
}: {
  viewMode: "table" | "cards";
  toggleViewMode: () => void;
}) => {
  return (
    <div className="flex justify-end mb-4">
      <Button onClick={toggleViewMode} variant="outline" size="sm">
        {viewMode === "table" ? (
          <LayoutGrid className="h-5 w-5" />
        ) : (
          <List className="h-5 w-5" />
        )}
        <span className="ml-2">Switch View</span>
      </Button>
    </div>
  );
};

export default function OrderList({ orders }: { orders: Order[] }) {
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards");
  const [loading, setLoading] = useState(true);
  const [orderList, setOrderList] = useState<Order[]>(orders);

  useEffect(() => {
    const savedView = localStorage.getItem("orderListViewMode");
    if (savedView === "table" || savedView === "cards") setViewMode(savedView);
    setLoading(false);
  }, []);

  const toggleViewMode = useCallback(() => {
    const newView = viewMode === "table" ? "cards" : "table";
    setViewMode(newView);
    localStorage.setItem("orderListViewMode", newView);
  }, [viewMode]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe("dashboard-updates");

    const newOrders = async () => {
      try {
      setLoading(true);
      const collectNewData = await fetchOrders();
      setLoading(false);
      console.log(collectNewData);
      } catch (error) {
      setLoading(false);
      console.error("Error fetching new orders:", error);
      }
    };

    channel.bind("new-order", () => {
      // Fetch updated orders
     newOrders()
      
       
    });

    return () => {
      channel.unbind("new-order");
      pusher.unsubscribe("dashboard-updates");
    };
  }, []);

  if (loading) {
    return viewMode === "table" ? (
      <div className="overflow-x-auto">
        <Skeleton className="h-4 w-full" />
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (orderList.length === 0) {
    return (
      <div>
        <OrderViewSwitcher viewMode={viewMode} toggleViewMode={toggleViewMode} />
        <p className="text-center text-muted-foreground">No orders to display</p>
      </div>
    );
  }

  return (
    <div>
      <OrderViewSwitcher viewMode={viewMode} toggleViewMode={toggleViewMode} />
      {viewMode === "table" ? (
        <OrderTableView orders={orderList} openDialog={() => {}} />
      ) : (
        <OrderCardView orders={orderList} openDialog={() => {}} />
      )}
    </div>
  );
}
