// helper/orderType.ts
export interface Order {
  id: string;
  orderNumber: string;
  customerName: string | null;
  status: string;
  isTripStart: boolean;
  resonOfcancel?: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  customer: {
    phone: string;
    name: string;
    address: string | undefined;
    latitude: string;
    longitude: string;
  };
  driver: {
    id: string;
    name: string;
    phone: string;
  } | null;
  shift: {
    name: string;
  };
  // Add missing fields from error message
  customerId: string;
  shiftId: string;
  driverId: string | null;
}