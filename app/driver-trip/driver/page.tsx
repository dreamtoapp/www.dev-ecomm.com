import React from "react";
import { getActiveTrip, getOrderCount } from "./action/actions";
import MenuList from "../components/MenuList";
import DriverHeader from "../components/DriverHeader";
import ActiveTrip from "./component/ActiveTrip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const NoActiveOrder = () => (
  <Card className="w-full max-w-md mx-auto mt-8">
    <CardHeader className="text-center">
      <RocketIcon className="mx-auto h-12 w-12 text-primary" />
      <CardTitle>لا يوجد رحلة نشطة</CardTitle>
      <CardDescription>
        سيتم عرض تفاصيل الرحلة هنا عندما تصبح متاحة
      </CardDescription>
    </CardHeader>
  </Card>
);

async function Page({
  searchParams,
}: {
  searchParams: Promise<{ driverId: string; status: string; name: string }>;
}) {
  try {
    const { driverId, status, name } = await searchParams;

    // Parallel data fetching for better performance
    const [activeTrip, orderCount] = await Promise.all([
      getActiveTrip(driverId),
      getOrderCount(driverId),
    ]);

    const totalCount =
      (orderCount.counts?.inWay || 0) +
      (orderCount.counts?.canceled || 0) +
      (orderCount.counts?.delivered || 0);

    return (
      <div className="flex flex-col w-full min-h-screen items-center justify-center ">
        <DriverHeader
          orderCount={totalCount}
          drivername={name}
          inWayOrders={orderCount.counts?.inWay || 0}
          canceledOrders={orderCount.counts?.canceled || 0}
          deliveredOrders={orderCount.counts?.delivered || 0}
          driverId={driverId}
        />

        {activeTrip ? <ActiveTrip order={activeTrip} /> : <NoActiveOrder />}
      </div>
    );
  } catch (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>حدث خطأ</AlertTitle>
        <AlertDescription>
          فشل في تحميل البيانات، يرجى التحقق من الاتصال بالإنترنت
        </AlertDescription>
      </Alert>
    );
  }
}

// Add loading state skeleton

export default Page;
