"use client";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import Link from "next/link";
import { Info, MapPin, Timer, Truck, TruckIcon, XCircle, CheckCircle } from "lucide-react";
import { FaFileInvoice } from "react-icons/fa";
import { Order } from "../helper/cardType";
import { STATUS_STYLES } from "../helper/helper";
import { formatDistanceToNow } from "date-fns";

const StatusIcon = ({ status }: { status: string }) => {
  const icons: Record<string, React.ReactNode> = {
    Pending: <Timer className="text-yellow-500 h-4 w-4" />,
    Delivered: <CheckCircle className="text-green-500 h-4 w-4" />,
    InWay: <Truck className="text-blue-500 h-4 w-4" />,
    Cancelled: <XCircle className="text-red-500 h-4 w-4" />,
  };
  return icons[status] || <Info className="text-gray-500 h-4 w-4" />;
};

export default function OrderTableRow({
  order,
  openDialog,
}: {
  order: Order;
  openDialog: (order: Order) => void;
}) {
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
          className={`bg-opacity-75 ${statusStyle.bgLight} ${statusStyle.bgDark} ${statusStyle.textLight} ${statusStyle.textDark}`}
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
}
