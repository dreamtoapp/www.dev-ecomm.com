"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { User } from "@prisma/client";
import { AlertCircle, ExternalLink, Eye, EyeOff, Globe, Loader2, MapPin, } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import useAccurateGeolocation from "../../../../../hooks/use-geo";
import { updateUserProfile } from "../action/update-user-profile";
import { useSession } from "next-auth/react";

const UserProfileForm = ({ userData }: { userData: User }) => {
  const session = useSession()

  const [showPassword, setShowPassword] = useState(false);
  const [state, fromAction, ispending] = useActionState(updateUserProfile, { success: false, message: "" })

  const {
    geoLatitude,
    geoLongitude,
    geoAccuracy,
    geoError,
    geoIsLoading,
    getGeolocation,
    getGoogleMapsLink,
  } = useAccurateGeolocation({
    accuracyThreshold: 10,
    maxRetries: 1,
  });

  useEffect(() => {
    getGeolocation();
  }, []);


  useEffect(() => {
    if (state.success) {
      window.location.reload();
    }
  }, [state.success]);


  return (

    <form
      action={fromAction}
      className="space-y-6 max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-xl border border-gray-100"
      dir="rtl"
    >

      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-gray-900">الملف الشخصي</h2>
        <p className="text-gray-600">إدارة إعدادات الحساب وتحديث المعلومات</p>
        <p className="text-gray-600">المعرف:{userData.phone}</p>
      </div>



      {/* Form Fields */}
      <div className="space-y-5">
        {/* User ID */}



        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-700 font-medium">
            الاسم الكامل
          </Label>
          <Input
            id="name"
            name="name"
            defaultValue={userData?.name || ""}
            placeholder="أدخل اسمك"
            required
            className="w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Grid for Phone and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              البريد الإلكتروني
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={userData.email || ""}
              placeholder="أدخل البريد الإلكتروني"
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">
              كلمة المرور
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                defaultValue={userData.password || ""}
                className="w-full pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={ispending}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" aria-hidden="true" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" aria-hidden="true" />
                )}
                <span className="sr-only">
                  {showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                </span>
              </Button>
            </div>
            <p className="text-sm text-gray-500">اتركه فارغًا إذا لم ترد التغيير</p>
          </div>
        </div>
        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address" className="text-gray-700 font-medium">
            العنوان
          </Label>
          <Textarea
            id="address"
            name="address"
            defaultValue={userData.address || ""}
            placeholder="أدخل عنوانك"
            rows={3}
            className="w-full resize-none"
          />
        </div>
        {/* Google Maps Link */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          {/* Section Header */}
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-medium text-gray-800">الموقع الحالي</h3>
          </div>

          {/* Coordinates Display */}
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Coordinates Display */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-white border border-gray-200 shadow-sm">
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500">الإحداثيات الحالية</span>
                  <div className="font-mono text-sm text-gray-800">
                    {geoLatitude?.toFixed(7) ?? '--.--'} :خط العرض
                    <span className="mx-2 text-gray-400">|</span>
                    {geoLongitude?.toFixed(7) ?? '--.--'} :خط الطول
                  </div>
                </div>
              </div>

              {/* Location Button */}

            </div>
            <div className="flex items-center gap-4 justify-end w-full pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="group flex items-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all"
                onClick={() => {
                  (document.getElementById("latitude") as HTMLInputElement).value = geoLatitude?.toString() || '';
                  (document.getElementById("longitude") as HTMLInputElement).value = geoLongitude?.toString() || '';
                }}
                disabled={geoIsLoading || !geoLatitude || !geoLongitude}
              >
                {geoIsLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    جاري التحديد...
                  </>
                ) : (
                  <>
                    <MapPin className="h-4 w-4 transition-transform group-hover:scale-110" />
                    استخدام الموقع الحالي
                  </>
                )}
              </Button>

              {/* Google Maps Link */}
              {geoLatitude && geoLongitude && (
                <div className=" border-gray-200">
                  <a
                    href={getGoogleMapsLink() ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-blue-600 hover:shadow-sm transition-all"
                  >
                    <span className="text-sm font-medium text-blue-600 hover:text-blue-700">
                      عرض الموقع على خرائط جوجل
                    </span>
                    <ExternalLink className="h-4 w-4 text-blue-600" />
                  </a>
                </div>
              )}
            </div>
            {/* Error State */}
            {geoError && (
              <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-700">خطأ في تحديد الموقع</p>
                  <p className="text-xs text-red-600">{geoError}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-700 hover:bg-red-100"
                  onClick={getGeolocation}
                >
                  إعادة المحاولة
                </Button>
              </div>
            )}
          </div>
        </div>


        {/* Coordinates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="latitude" className="text-gray-700 font-medium">
              خط العرض
            </Label>
            <Input
              id="latitude"
              name="latitude"
              type="text"
              inputMode="numeric"
              defaultValue={userData.latitude}
              placeholder="أدخل خط العرض"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="longitude" className="text-gray-700 font-medium">
              خط الطول
            </Label>
            <Input
              id="longitude"
              name="longitude"
              type="text"
              inputMode="numeric"
              defaultValue={userData.longitude}
              placeholder="أدخل خط الطول"
              className="w-full"
            />
          </div>
        </div>
        {state.message && (
          <div
            className={`mt-4 p-3 rounded ${state.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
          >
            {state.message}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-lg font-semibold rounded-xl transition-transform hover:scale-[1.01]"
          disabled={ispending}
        >
          حفظ التغييرات
        </Button>
      </div>
    </form>
  );
};

export default UserProfileForm;