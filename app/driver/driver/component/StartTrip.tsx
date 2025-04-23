"use client";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { RocketIcon } from "lucide-react";
import { startTrip } from "../action/startTrip";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  orderId: string;
  driverId: string;
  latitude: number;
  longitude: number;
  driverName: string;
}

function StartTrip({
  orderId,
  driverId,
  latitude,
  longitude,
  driverName,
}: Props) {
  const router = useRouter();
  const handleStartTrip = async () => {
    try {
      if (!orderId) {
        toast.error("لا يوجد سائق لهذا الطلب");
        return;
      }

      const result = await startTrip(
        orderId,
        driverId,
        // order.orderNumber,
        latitude,
        longitude
      );
      router.push(
        `/driver-trip/driver?driverId=${driverId}&status=InWay&name=${driverName}`
      );
    } catch (error: any) {
      toast.error(error.message || "فشل في الحصول على الموقع");
    }
  };
  return (
    <Button
      onClick={handleStartTrip}
      className="w-1/2 flex h-12  items-center gap-4"
    >
      <p>ابداء الرحلة</p>
      <RocketIcon className="h-12 w-12 text-white" />
    </Button>
  );
}

export default StartTrip;
