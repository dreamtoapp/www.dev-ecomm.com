"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { authenticateDriver } from "./actions/actions";
import { useRouter } from "next/navigation";

interface Driver {
  id: string;
  name: string;
  phone: string;
}

export default function DriverTrip() {
  const [driver, setDriver] = useState<Driver | null>(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  useEffect(() => {
    const savedDriver = localStorage.getItem("driver");
    if (savedDriver) {
      setDriver(JSON.parse(savedDriver));
    }
  }, []);

  useEffect(() => {
    if (driver) {
      router.push(
        `/driver/driver?driverId=${driver.id}&status=InWay&name=${driver.name}`
      );
    }
  }, [driver, router]);

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await authenticateDriver(formData);

        if (result?.error) {
          setError(result.error);
          return;
        }

        if (result?.driver) {
          localStorage.setItem("driver", JSON.stringify(result.driver));
          setDriver(result.driver);
        }
      } catch (err) {
        setError("حدث خطأ أثناء تسجيل الدخول");
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-md p-8 space-y-6 text-right">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">تسجيل دخول </h1>
          <p className="text-muted-foreground">
            الرجاء إدخال بيانات الاعتماد الخاصة بك
          </p>
        </div>

        <form action={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">رقم الجوال</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="05XXXXXXXX"
              className="text-right"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="text-right"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full gap-2" disabled={isPending}>
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending ? "جاري التحقق..." : "تسجيل الدخول"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
