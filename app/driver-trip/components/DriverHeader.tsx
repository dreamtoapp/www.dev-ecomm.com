"use client";

import { Package, RefreshCw } from "lucide-react";
import { Button } from "../../../components/ui/button";
import MenuList from "./MenuList";

interface DriverHeaderProps {
  orderCount?: number;
  drivername?: string;
  onRefresh?: () => void; // Callback for refresh action
  inWayOrders: number;
  canceledOrders: number;
  deliveredOrders: number;
  driverId: string;
}

const DriverHeader = ({
  orderCount = 0,
  drivername = "السائق",
  inWayOrders,
  canceledOrders,
  deliveredOrders,
  driverId,
  onRefresh,
}: DriverHeaderProps) => {
  return (
    <header className="fixed top-0 w-full bg-gradient-to-b from-primary to-primary/90 shadow-lg z-50 px-4 py-2">
      <div className="flex items-center justify-between w-full">
        {/* Start (Right in RTL): Driver's name with icon */}
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-primary-foreground" />
          <span className="text-sm font-medium text-primary-foreground">
            {drivername}
          </span>
        </div>

        {/* End (Left in RTL): Order count and refresh button */}
        <div className="flex items-center gap-3">
          {/* Refresh button with timer*/}
          <MenuList
            inWayOrders={inWayOrders}
            canceledOrders={canceledOrders}
            deliveredOrders={deliveredOrders}
            driverId={driverId}
          />
        </div>
      </div>
      <div className="h-[1px] bg-primary-foreground/10 w-full mt-2" />
    </header>
  );
};

export default DriverHeader;
