"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Order } from "../helper/cardType";
import OrderTableRow from "./OrderTableRow";

export default function OrderTableView({
  orders,
  openDialog,
}: {
  orders: Order[];
  openDialog: (order: Order) => void;
}) {
  return (
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
            <OrderTableRow key={order.id} order={order} openDialog={openDialog} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
