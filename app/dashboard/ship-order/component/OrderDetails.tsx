"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { PackageIcon, User, Phone, MapPin, Clock } from "lucide-react";
import Map from "../../../../components/Map";
import { SelectDriver } from "./SelectDriver";
import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import { approveDriverToOrder } from "../action/action";
import { useRouter } from "next/navigation";
import PrintOrderDetails from "./PrintButton";

// Dynamically import the Map component with SSR disabled

interface Product {
  id: string;
  name: string;
  price: number;
  size?: string | null;
  details?: string | null;
  description?: string | null;
  imageUrl?: string | null; // Allow both undefined and null
  publicId?: string | null; // Allows string, null, or undefined
  supplierId?: string | null;
  type?: string | null;
  published?: boolean;
  outOfStock?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Customer {
  id: string;
  phone: string;
  latitude: string;
  longitude: string;
  avatar: string;
  name: string;
  email?: string | null;
  address?: string | null;
  password: string;
  role: string;
  isOtp: boolean;
}

interface Driver {
  id: string;
  name: string;
}
interface Drivers extends Array<Driver> {} // Represents an array of drivers

interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string | null;
  driverId?: string | null;
  latitude: string | null;
  longitude: string | null;
  status: string;
  amount: number;
  shiftId: string;
  createdAt: Date;
  updatedAt: Date;
  items: OrderItem[];
  shift: Shift;
  customer: Customer;
}

interface OrderDetailsProps {
  order: Order;
  driver?: Driver[]; // Array of drivers
}

export function OrderDetails({ order, driver }: OrderDetailsProps) {
  const [selectedDriverId, setSelectedDriverId] = useState(
    order.driverId || ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (!order) {
    return <div>Order not found</div>;
  }

  const handleDriverApproval = async () => {
    if (!selectedDriverId) return;
    setIsLoading(true);

    try {
      await approveDriverToOrder(order.id, selectedDriverId);
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to assign driver:", error);
      // Add error toast/notification here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PrintOrderDetails order={order} />
      <Card className="w-full max-w-2xl mx-auto mb-10">
        {/* <PrintOrderDetails /> */}
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>تفاصيل الطلب</CardTitle>
            <CardTitle className="text-green-300 bg-green-700 px-2 rounded py-1">
              حالة الطلب : {order.status}
            </CardTitle>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">
              رقم الطلب: {order.orderNumber}
            </span>
            <Badge variant="secondary" className="text-sm">
              {format(new Date(order.createdAt), "MMM dd, yyyy")}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-8">
            {/* Customer Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5" /> معلومات العميل
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">الجوال:</span>
                  <span>{order.customer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">العنوان:</span>
                  <span>{order.customer.address || "غير متوفر"}</span>
                </div>
              </div>
            </div>

            {/* Delivery Details Section */}
            <div className="space-y-4 w-full">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5" /> تفاصيل التوصيل
                </h3>
                <div className="flex items-center gap-2 bg-green-600 px-2 rounded">
                  <span className="font-medium">الوردية:</span>
                  <span>{order.shift.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-between w-full flex-warp">
                <div className="flex items-center gap-2">
                  <p>خط الطول :</p>
                  <p>{order.latitude || "غير متوفر"}</p>
                </div>
                <div>خط العرض : {order.longitude || "غير متوفر"}</div>
                {/* <Map latitude={order.latitude} longitude={order.longitude} /> */}
              </div>
            </div>

            {/* Order Items Section */}

            <div className="space-y-4 w-full">
              {order.status === "Pending" && (
                <div className="flex justify-between  flex-col gap-2 bg-gray-600 p-2 rounded">
                  <p className="text-white">اختار السائق</p>
                  <div className="flex items-center justify-between w-full">
                    <SelectDriver
                      drivers={driver || []}
                      selectedDriverId={selectedDriverId}
                      setSelectedDriverId={setSelectedDriverId}
                    />
                    <Button
                      onClick={handleDriverApproval}
                      disabled={isLoading || !selectedDriverId}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {isLoading && (
                        <svg
                          className="animate-spin mr-2 h-4 w-4 text-white"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      )}
                      {isLoading ? "جارٍ الإسناد..." : "إسناد السائق"}
                    </Button>
                  </div>
                </div>
              )}

              <Table dir="rtl" className="w-full">
                <TableHeader className="bg-secondary">
                  <TableRow>
                    {/* Fixed width for columns */}
                    <TableHead className="w-[50%] text-center ">
                      المنتج
                    </TableHead>
                    <TableHead className="w-[25%] text-center">
                      الكمية
                    </TableHead>
                    <TableHead className="w-[25%] text-right">السعر</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      {/* Apply the same width classes to TableCell as in TableHead */}
                      <TableCell className="w-[50%] font-medium ">
                        {item.product.name}
                      </TableCell>
                      <TableCell className="w-[25%] text-center">
                        <div className="flex items-center justify-center gap-2">
                          <PackageIcon className="w-4 h-4 text-gray-500" />
                          <span>{item.quantity}</span>
                        </div>
                      </TableCell>
                      <TableCell className="w-[25%] text-right">
                        ر.س‏ {item.price.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter className="bg-secondary">
                  <TableRow>
                    {/* Use colSpan to merge cells for the total row */}
                    <TableCell colSpan={2} className="text-right">
                      الاجمالي
                    </TableCell>
                    <TableCell className="w-[25%] text-right">
                      ر.س‏ {order.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

            {/* Total Amount Section */}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
