"use client"
import { useEffect, useState } from "react";
import { CheckCircle, Loader2, MapPin, Navigation, Target } from "lucide-react";
import useAccurateGeolocation from "../../../../hooks/use-geo";
import { Company } from "../../../../types/company";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import Map from "../../../../components/Map";
import { toast } from "sonner";

const LocationSection = ({
  company,
  errors,
  isGeolocationAvailable,
  isGeolocationEnabled,
  latitude,
  longitude,
  setLatitude,
  setLongitude,
}: {
  company: Company | null;
  errors: any;
  isGeolocationAvailable: boolean;
  isGeolocationEnabled: boolean;
  latitude: string;
  longitude: string;
  setLatitude: (value: string) => void;
  setLongitude: (value: string) => void;
}) => {

  const [newlatitude, setNewlatitude] = useState("")
  const [newlongitude, setNewlongitude] = useState("")


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



  const isValidCoordinate = (value: string) => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= -180 && num <= 180;
  };

  const handleLatitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isValidCoordinate(value)) setLatitude(value);
  };

  const handleLongitudeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isValidCoordinate(value)) setLongitude(value);
  };

  const handleApproveCoordinates = () => {
    if (geoLatitude && geoLongitude) {
      setLatitude(geoLatitude.toFixed(7));
      setLongitude(geoLongitude.toFixed(7));
      toast.success("تم اعتماد الإحداثيات بنجاح");
    }
  };

  return (
    <Card className="relative">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <span>الموقع الجغرافي</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* العنوان */}
        <div className="space-y-2">
          <Label htmlFor="address" className="flex items-center gap-2 text-muted-foreground">
            <Navigation className="w-4 h-4" />
            العنوان التفصيلي
          </Label>
          <Input
            id="address"
            name="address"
            defaultValue={company?.address}
            aria-invalid={!!errors.address}
            placeholder="مثال: الرياض - حي الملقا - شارع الملك فهد"
            className="h-12"
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <Target className="w-3 h-3" />
              {errors.address}
            </p>
          )}
        </div>

        {/* معلومات الإحداثيات */}
        <div className="bg-muted/50 p-4 rounded-lg border">
          <p className="font-bold text-primary underline underline-offset-4">اتوماتيك</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div >
              <Label className="flex items-center gap-2 text-sm font-medium">
                <span className="text-muted-foreground">خط العرض</span>
                <span className="text-primary">{geoLatitude || '--'}</span>
              </Label>

            </div>

            <div >
              <Label className="flex items-center gap-2 text-sm font-medium">
                <span className="text-muted-foreground">خط الطول</span>
                <span className="text-primary">{geoLongitude || '---'}</span>
              </Label>
            </div>



            {geoError && (
              <div className=" bg-red-50 rounded-md flex items-center gap-2 text-red-600 text-sm">
                <Target className="w-4 h-4" />
                {geoError}
              </div>
            )}

          </div>


          <div className="flex items-center gap-4 justify-end w-full">
            <Button
              type="button"
              onClick={getGeolocation}
              disabled={geoIsLoading || !isGeolocationAvailable}
              className="h-12 gap-2"
              variant={geoError ? 'destructive' : 'default'}
            >
              {geoIsLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  جاري البحث...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4" />
                  {geoError ? 'إعادة المحاولة' : 'تحديد الموقع'}
                </>
              )}
            </Button>

            <Button
              type="button"
              onClick={handleApproveCoordinates}
              disabled={!geoLatitude || !geoLongitude}
              className="h-12 gap-2 bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="w-4 h-4" />
              اعتماد الإحداثيات
            </Button>
          </div>

        </div>

        {/* التحكم في الإحداثيات */}
        <div className="bg-muted/50 p-4 rounded-lg border">
          <p className="font-bold text-primary underline underline-offset-8">يدوي</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-secondary p-2 rounded-md ">

            <div className="space-y-2">
              <Label htmlFor="latitude">إدخال خط العرض</Label>
              <Input
                id="latitude"
                name="latitude"
                value={latitude}
                onChange={handleLatitudeChange}
                placeholder="مثال: 24.7136"
                pattern="-?\d*\.?\d*"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="longitude">إدخال خط الطول</Label>
              <Input
                id="longitude"
                name="longitude"
                value={longitude}
                onChange={handleLongitudeChange}
                placeholder="مثال: 46.6753"
                pattern="-?\d*\.?\d*"
              />
            </div>

            {latitude && longitude && (
              <Map
                latitude={parseFloat(latitude)}
                longitude={parseFloat(longitude)}

              />
            )}
          </div>
        </div>

        {/* الخريطة */}

      </CardContent>
    </Card>
  );
};

export default LocationSection;