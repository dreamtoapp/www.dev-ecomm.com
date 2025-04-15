"use client";
import { AnimatePresence } from "framer-motion";
import { Order } from "../helper/cardType";
import OrderCard from "./OrderCard"; // Ensure correct import

export default function OrderCardView({
  orders,
  openDialog,
}: {
  orders: Order[];
  openDialog: (order: Order) => void;
}) {
  return (
    <AnimatePresence>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} openDialog={openDialog} />
        ))}
      </div>
    </AnimatePresence>
  );
}
