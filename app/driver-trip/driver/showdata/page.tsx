import React from "react";
import { getOrderByStatus } from "../action/actions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { User, ShoppingCart, DollarSign, FileText } from "lucide-react";
import BackButton from "../../../../components/BackButton";
import StartTrip from "../component/StartTrip";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ driverId: string; status: string }>;
}) {
  const { driverId, status } = await searchParams;
  const orders = await getOrderByStatus(driverId, status);
  let title = "";
  if (status === "InWay") {
    title = "    📦 قائمة التسليم ";
  }
  if (status === "Delivered") {
    title = "    📦 تم التسليم ";
  }
  if (status === "canceled") {
    title = "    📦 ملغي ";
  }

  return (
    <div className="flex flex-col min-h-screen gap-6 p-6 ">
      <div className="flex justify-between items-center">
        <h1 className=" font-bold text-center ">
          {title}({orders?.ordersToShip?.length || 0})
        </h1>
        <BackButton />
      </div>

      {Array.isArray(orders?.ordersToShip) && orders.ordersToShip.length > 0 ? (
        orders.ordersToShip.map((order) => (
          <Card
            key={order.id}
            className="shadow-md bg-white border border-gray-200 rounded-lg"
          >
            <CardHeader className="bg-gray-200 rounded-t-lg p-4">
              <CardTitle className="text-lg flex items-center gap-2 text-gray-700">
                <FileText className="h-5 w-5 text-blue-500" />
                <span className="font-medium text-sm">
                  رقم الفاتورة: {order.orderNumber}
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <User className="h-5 w-5 text-green-500" />
                <span className="font-medium">
                  العميل: {order.customer.name}
                </span>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <ShoppingCart className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">حالة الطلب: {order.status}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <DollarSign className="h-5 w-5 text-red-500" />
                <span className="font-medium">
                  الإجمالي:{" "}
                  <span className="font-bold text-lg text-gray-800">
                    {order.amount.toFixed(2)} SAR
                  </span>
                </span>
              </div>
            </CardContent>
            {status === "InWay" && (
              <CardFooter className="bg-gray-200 rounded-b-lg p-4 flex items-center justify-center">
                <StartTrip
                  orderId={order.id}
                  driverId={driverId}
                  latitude={parseFloat(order.customer.latitude)}
                  longitude={parseFloat(order.customer.longitude)}
                  driverName={order?.driver?.name ?? ""}
                />
              </CardFooter>
            )}
          </Card>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-10 text-lg">
          🚚 لا توجد طلبات للشحن
        </p>
      )}
    </div>
  );
}

export default page;
