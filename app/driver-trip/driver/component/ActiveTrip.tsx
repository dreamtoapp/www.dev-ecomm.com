"use client";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Phone, MapPin, PhoneCall, Package } from "lucide-react";
import { Order } from "../../../../types/orderType";
import { Button } from "../../../../components/ui/button";
import DeleverOrder from "./DeleverOrder";
import CancelOrder from "./CancelOrder";
import DriverTracker from "./TrackDriver";

export default function ActiveTrip({ order }: { order: Order }) {
  // Dummy coordinates for Google Maps (replace with real data if available)
  const customerLocation = "24.7136,46.6753"; // Example: Riyadh coordinates
  const googleMapsLink = `https://www.google.com/maps?q=${customerLocation}`;

  return (
    <div className=" bg-gray-100 p-2 flex flex-col gap-2 h-screen w-full items-center justify-center">
      {/* Order Summary Card */}
      <DriverTracker
        driverId={order.driver?.id || "driver"}
        orderId={order.id}
      />
      <Card className="bg-white rounded-lg shadow-sm p-4 w-full">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-gray-800">
              طلب #{order.orderNumber}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(order.createdAt), {
              addSuffix: true,
              locale: ar,
            })}
          </span>
        </div>

        <div className="space-y-2 text-gray-700">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-400" />
            <span>{order.customer.name || "عميل غير معروف"}</span>
          </div>
        </div>
      </Card>

      {/* Items Card with ScrollArea */}
      <Card className="bg-white rounded-lg shadow-sm p-4 w-full ">
        <div className="flex items-center gap-2 mb-3">
          <Package className="h-5 w-5 text-gray-400" />
          <span className="text-lg font-semibold text-gray-800">المنتجات</span>
        </div>

        <ScrollArea className="h-[30vh] w-full bg-slate-200">
          <div className="space-y-2 text-gray-700 pr-2">
            {order.items.map((item, index) => (
              <div
                key={item.id + index.toString()}
                className="flex justify-between items-center"
              >
                <span>{item.product.name}</span>
                <div className="flex gap-4">
                  <span className="text-gray-500">x{item.quantity}</span>
                  <span className="font-medium">{item.price} ريال</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Total Amount */}
        <div className="mt-4 pt-2 border-t border-gray-200 flex justify-between items-center">
          <span className="text-gray-600 font-semibold">الإجمالي</span>
          <span className="text-xl font-bold text-green-600">
            {order.amount.toFixed(2)} ريال
          </span>
        </div>
      </Card>
      <div className="flex items-center justify-between gap-2">
        <DeleverOrder
          orderId={order.id}
          orderNumber={order.orderNumber}
          driverId={order.driver?.id || "driver"}
          driverName={order.driver?.name || "driver name "}
        />
        <CancelOrder
          orderId={order.id}
          orderNumber={order.orderNumber}
          driverId={order.driver?.id || "driver"}
          driverName={order.driver?.name || "driver name "}
        />
      </div>

      {/* Sticky Status Bar */}
      <div className="fixed bottom-0 left-0 right-0  bg-gray-200 shadow-lg p-2 flex justify-around items-center border-t border-gray-200   ">
        <a
          href={`tel:${order.customer.phone}`}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <PhoneCall className="h-5 w-5" />
          <span className="font-semibold">اتصل بالعميل</span>
        </a>
        <a
          href={googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors"
        >
          <MapPin className="h-5 w-5" />
          <span className="font-semibold">مشاركة الموقع</span>
        </a>
      </div>
    </div>
  );
}
