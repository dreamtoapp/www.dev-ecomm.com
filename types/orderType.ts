interface Product {
  id: string;
  name: string;
  price: number;
}

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  address?: string | null;
  latitude: string;
  longitude: string;
}

interface Shift {
  id: string;
  name: string;
}

export interface Order1 {
  id: string;
  orderNumber: string;
  customerId: string;
  shiftId: string;
  customer: Customer;

  shift: Shift;

  items: OrderItem[];
  latitude?: string | null;
  longitude?: string | null;
  createdAt: Date;
  amount: number;
  driver: {
    id: string;
    name: string;
    phone: string;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  isTripStart: boolean;
  customerId: string;
  customerName: string | null;
  shiftId: string;
  driverId: string | null;
  status: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  items: {
    id: string;
    productId: string;
    quantity: number;
    price: number;
    product: Product;
  }[];
  customer: {
    id: string;
    phone: string;
    name: string;
    address: string | null;
    latitude: string;
    longitude: string;
  };
  driver?: {
    id: string;
    name: string;
    phone: string;
  } | null;
  shift: { name: string; id: string };
}
