import { OrderCartItem } from "../../../../types/order";

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string | null;
  status: string;
  isTripStart: boolean;

  resonOfcancel: string | null;
  amount: number;
  shift: { name: string };
  createdAt: Date;
  updatedAt: Date;
  items: OrderCartItem[];

  customer: {
    phone: string;
    name: string;
    address: string;
    latitude: string;
    longitude: string;
  };
  driver: {
    id: string;
    name: string;
    phone: string;
  };
}
