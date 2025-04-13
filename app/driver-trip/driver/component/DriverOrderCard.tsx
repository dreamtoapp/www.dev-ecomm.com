"use client";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { User, Phone, Car, Calendar, RefreshCw, List } from "lucide-react";
import { startTrip, updateCoordinates } from "../action/startTrip";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  driverId: string | null; // ✅ Allow null values
  amount: number;
  shift: { name: string };
  createdAt: Date;
  updatedAt: Date;
  customer: {
    phone: string;
    name: string;
    latitude: string;
    longitude: string;
  };
  driver: {
    id: string;
    name: string;
    phone: string;
  } | null;
}

export default function DriverOrderCard({ order }: { order: Order }) {
  const UPDATE_INTERVAL = 300; // 5 minutes in seconds (configurable)
  const [isTracking, setIsTracking] = useState(false);
  const [countdown, setCountdown] = useState(UPDATE_INTERVAL);

  const handleStartTrip = async () => {
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }
      );

      if (!order.driver) {
        toast.error("لا يوجد سائق لهذا الطلب");
        return;
      }

      const result = await startTrip(
        order.id,
        order.driver.id,
        // order.orderNumber,
        position.coords.latitude,
        position.coords.longitude
      );

      if (result.success) {
        setIsTracking(true);
        setCountdown(UPDATE_INTERVAL);
        toast.success("تم بدء الرحلة بنجاح");
      } else {
        toast.error(result.error || "فشل غير معروف");
      }
    } catch (error: any) {
      toast.error(error.message || "فشل في الحصول على الموقع");
    }
  };

  useEffect(() => {
    if (!isTracking) return;

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                if (!order.driver) {
                  toast.error("لا يوجد سائق لهذا الطلب");
                  return;
                }
                await updateCoordinates(
                  order.id,
                  order.driver.id,
                  position.coords.latitude,
                  position.coords.longitude
                );
                setCountdown(UPDATE_INTERVAL);
              } catch (error) {
                toast.error("فشل تحديث الإحداثيات");
                setCountdown(UPDATE_INTERVAL);
              }
            },
            (error) => {
              toast.error("خطأ في الحصول على الموقع");
              setCountdown(UPDATE_INTERVAL);
            }
          );
          return UPDATE_INTERVAL;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTracking, order.id, order.driver?.id]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <Card className="shadow-sm bg-background">
      <CardHeader className="p-4 space-y-3">
        <div className="flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>
              {formatDistanceToNow(new Date(order.createdAt), {
                addSuffix: true,
                locale: ar,
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            <span>
              {formatDistanceToNow(new Date(order.updatedAt), {
                addSuffix: true,
                locale: ar,
              })}
            </span>
          </div>
        </div>

        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <List className="h-5 w-5" />
            <span>{order.orderNumber}</span>
          </div>
          <span className="text-lg font-semibold text-primary">
            {order.amount.toFixed(2)} SAR
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{order.customer.name || "عميل غير معروف"}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>{order.customer.phone}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4">
        <Button
          className="w-full"
          onClick={handleStartTrip}
          disabled={isTracking}
        >
          <Car className="h-4 w-4 ml-2" />
          {isTracking ? (
            <div className="flex  items-center w-full">
              <span>تتبع الرحلة</span>
              <span className="text-xs text-muted-foreground mt-1">
                التحديث التالي: {minutes}:{seconds < 10 ? "0" : ""}
                {seconds}
              </span>
            </div>
          ) : (
            "الانطلاق للعميل"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
