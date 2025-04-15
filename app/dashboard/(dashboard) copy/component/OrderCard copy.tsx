"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Truck,
  AlertCircle,
  XCircle,
  Info,
  MapPin,
  LayoutGrid,
  List,
  TruckIcon,
  User,
  Phone,
  Calendar,
  RefreshCw,
  Timer,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { FaFileInvoice } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

import { Order } from "../helper/cardType";
import { STATUS_STYLES, STATUS_TRANSLATIONS } from "../helper/helper";

const StatusIcon = ({ status }: { status: string }) => {
  const icons: Record<string, React.ReactNode> = {
    Pending: <Timer className="text-yellow-500 h-4 w-4" />,
    Delivered: <CheckCircle className="text-green-500 h-4 w-4" />,
    InWay: <Truck className="text-blue-500 h-4 w-4" />,
    Cancelled: <XCircle className="text-red-500 h-4 w-4" />,
  };
  return icons[status] || <Info className="text-gray-500 h-4 w-4" />;
};

// OrderTableRow component for table view
const OrderTableRow = ({
  order,
  openDialog,
}: {
  order: Order;
  openDialog: (order: Order) => void;
}) => {
  const statusStyle = STATUS_STYLES[order.status] || STATUS_STYLES.Default;

  return (
    <motion.tr
      key={order.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`${statusStyle.bgLight} ${statusStyle.bgDark} ${statusStyle.textLight} ${statusStyle.textDark} hover:bg-opacity-90 dark:hover:bg-opacity-10`}
    >
      <TableCell className="font-semibold">{order.orderNumber}</TableCell>
      <TableCell>{order.customerName || "Unknown Customer"}</TableCell>
      <TableCell className="text-right font-semibold">
        {order.amount.toFixed(2)} SAR
      </TableCell>
      <TableCell>
        <Badge
          className={`bg-opacity-75 ${statusStyle.bgLight}   ${statusStyle.bgDark} ${statusStyle.textLight} ${statusStyle.textDark}`}
        >
          <StatusIcon status={order.status} /> {order.status}
        </Badge>
      </TableCell>
      <TableCell>
        <p className="text-sm text-muted-foreground">
          Created:{" "}
          {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
        </p>
        <p className="text-sm text-muted-foreground">
          Updated:{" "}
          {formatDistanceToNow(new Date(order.updatedAt), { addSuffix: true })}
        </p>
      </TableCell>
      <TableCell className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          aria-label="View Details"
          onClick={() => openDialog(order)}
        >
          <Info className="h-4 w-4" />
        </Button>
        {order.status === "InWay" && (
          <Link
            href={{ pathname: `/dashboard/orders/${order.orderNumber}/track` }}
          >
            <Button variant="default" size="sm" aria-label="Track Order">
              <MapPin className="h-4 w-4" />
            </Button>
          </Link>
        )}
        {order.status === "Pending" && (
          <Link
            href={`/dashboard/ship-order/${order.id}`}
            className={buttonVariants({
              variant: "default",
              className:
                "bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white w-full",
            })}
          >
            <TruckIcon className="h-4 w-4 mr-2" /> Ship
          </Link>
        )}
        {order.status === "Delivered" && (
          <Link
            href={`/dashboard/ship-order/${order.id}`}
            className={buttonVariants({
              variant: "default",
              className:
                "bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white w-full",
            })}
          >
            <Button
              variant="default"
              size="sm"
              className="bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 text-white"
              aria-label="View Invoice"
            >
              <FaFileInvoice className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </TableCell>
    </motion.tr>
  );
};

// OrderCard component for card view
const OrderCard = ({
  order,
}: {
  order: Order;
  openDialog: (order: Order) => void;
}) => {
  // Arabic status translations

  const statusStyle = STATUS_STYLES[order.status] || STATUS_STYLES.Default;

  return (
    <Card
      className={`shadow-md rounded-lg ${statusStyle.border} ${statusStyle.bgLight} ${statusStyle.bgDark} ${statusStyle.textLight} ${statusStyle.textDark}`}
    >
      <CardHeader className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Badge
            className={`bg-opacity-75 flex items-center justify-center gap-2 ${statusStyle.bgLight} ${statusStyle.bgDark} ${statusStyle.textLight} ${statusStyle.textDark}`}
          >
            <StatusIcon status={order.status} />
            {STATUS_TRANSLATIONS[
              order.status as
                | "Delivered"
                | "canceled"
                | "Returned"
                | "InWay"
                | "Pending"
            ] || STATUS_TRANSLATIONS.Default}
          </Badge>
          <Link
            href={`/dashboard/ship-order/${order.id}`}
            className="flex items-center gap-2    rounded-sm justify-center p-1 text-white"
          >
            <Info className="h-5 w-5" />
          </Link>
        </div>
        <div className="text-sm text-muted-foreground flex items-center justify-between flex-wrap">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs">
              {formatDistanceToNow(new Date(order.createdAt), {
                addSuffix: true,
                locale: ar,
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="h-3 w-3 text-muted-foreground" />
            <p className="text-xs">
              {formatDistanceToNow(new Date(order.updatedAt), {
                addSuffix: true,
                locale: ar,
              })}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap">
          <CardTitle className="text-sm flex items-center gap-2">
            <List className="h-4 w-4 text-muted-foreground" />
            {order.orderNumber}
          </CardTitle>
          <CardTitle className="text-lg font-semibold">
            {order.amount.toFixed(2)} SAR
          </CardTitle>
          <CardTitle className="text-xs flex items-center gap-2 justify-end w-full">
            <Truck size={16} /> {order.driver?.name || "Unknown Driver"}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <CardDescription className="text-sm flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          {order.customer?.name || "Unknown Customer"}
        </CardDescription>
        <CardDescription className="text-sm flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          {order.customer.phone || "No phone provided"}
        </CardDescription>

        {order.status === "canceled" && (
          <p className="text-sm bg-red-500 p-2 rounded ">
            السبب : {order.resonOfcancel}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-end gap-2">
        <div className="flex items-center justify-between gap-2 w-full">
          {order.status === "InWay" && order.isTripStart && (
            // <Link href={`/dashboard/ship-order/${order.id}`}>
            <Button
              variant="default"
              // size="sm"
              onClick={() => alert("Track order")}
              className="w-full"
            >
              <MapPin className="h-4 w-4" /> تتبع الطلبية
            </Button>
            // </Link>
          )}

          {order.status === "Pending" && (
            <Link
              href={`/dashboard/ship-order/${order.id}`}
              className={buttonVariants({
                variant: "default",
                className:
                  "bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white w-full",
              })}
            >
              <TruckIcon className="h-4 w-4 mr-2" /> شحن الطلبية
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

// OrderViewSwitcher component to toggle between table and card views
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

// Main OrderList component
export default function OrderList({ orders }: { orders: Order[] }) {
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards");
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Load view mode from localStorage and set loading state
  useEffect(() => {
    const savedView = localStorage.getItem("orderListViewMode");
    if (savedView === "table" || savedView === "cards") setViewMode(savedView);
    setLoading(false);
  }, []);

  // Toggle between table and card views
  const toggleViewMode = useCallback(() => {
    const newView = viewMode === "table" ? "cards" : "table";
    setViewMode(newView);
    localStorage.setItem("orderListViewMode", newView);
  }, [viewMode]);

  // Open the dialog with selected order details
  const openDialog = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  // Loading state with skeleton placeholders
  if (loading) {
    return viewMode === "table" ? (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Timestamps</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(3)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-48" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-16" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="shadow-md rounded-lg">
            <CardHeader>
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-8 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  // Empty state
  if (orders.length === 0) {
    return (
      <div>
        <OrderViewSwitcher
          viewMode={viewMode}
          toggleViewMode={toggleViewMode}
        />
        <p className="text-center text-muted-foreground">
          No orders to display
        </p>
      </div>
    );
  }

  // Main content with table or card view
  return (
    <div>
      <OrderViewSwitcher viewMode={viewMode} toggleViewMode={toggleViewMode} />
      {viewMode === "table" ? (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamps</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <OrderTableRow
                  key={order.id}
                  order={order}
                  openDialog={openDialog}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} openDialog={openDialog} />
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
