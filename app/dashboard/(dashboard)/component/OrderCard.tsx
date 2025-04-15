"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, RefreshCw, List, Truck, User, Phone } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { Order } from "../helper/cardType";
import { STATUS_STYLES, STATUS_TRANSLATIONS } from "../helper/helper";

const StatusIcon = ({ status }: { status: string }) => {
  const icons: Record<string, React.ReactNode> = {
    Pending: <Truck className="text-yellow-500 h-4 w-4" />,
    Delivered: <Truck className="text-green-500 h-4 w-4" />,
    InWay: <Truck className="text-blue-500 h-4 w-4" />,
    Cancelled: <Truck className="text-red-500 h-4 w-4" />,
  };
  return icons[status] || <Truck className="text-gray-500 h-4 w-4" />;
};

export default function OrderCard({
  order,
  openDialog,
}: {
  order: Order;
  openDialog: (order: Order) => void;
}) {
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
          <button
            onClick={() => openDialog(order)}
            className="flex items-center gap-2 rounded-sm justify-center p-1 text-white"
          >
            <MapPin className="h-5 w-5" />
          </button>
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

        {order.status === "Cancelled" && (
          <p className="text-sm bg-red-500 p-2 rounded">
            السبب : {order.resonOfcancel}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-end gap-2">
        <div className="flex items-center justify-between gap-2 w-full">
          {order.status === "InWay" && order.isTripStart && (
            <Link
              href={{ pathname: `/dashboard/track/${order.id}` }}
              className="w-full flex items-center justify-center bg-primary/80 p-2 rounded-md text-white gap-2"
            >
              <MapPin className="h-4 w-4" />
              <p>تتبع الطلبية</p>
            </Link>
          )}

          {order.status === "Pending" && (
            <Link
              href={`/dashboard/ship-order/${order.id}`}
              className="w-full flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white p-2 rounded-md gap-2"
            >
              <Truck className="h-4 w-4" />
              <p>شحن الطلبية</p>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
