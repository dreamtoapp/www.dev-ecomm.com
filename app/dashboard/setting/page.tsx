"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchCompany, saveCompany } from "./actions/actions";
import { useGeolocated } from "react-geolocated";
import { Company } from "../../../types/company";
import SocialMediaSection from "./component/SocialMediaSection";
import SettingsSkeleton from "./component/SettingsSkeleton";
import GeneralInfoSection from "./component/GeneralInfoSection";
import LocationSection from "./component/LocationSection";
import SubmitButton from "./component/SubmitButton";






// Main Component
export default function SettingsPage() {
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
    userDecisionTimeout: 5000,
  });
  useEffect(() => {
    const loadCompany = async () => {
      try {
        const data = await fetchCompany();
        if (data) {
          setCompany(data);
          setLatitude(data.latitude || "");
          setLongitude(data.longitude || "");
        }
      } catch (error) {
        toast.error("فشل تحميل بيانات الشركة.");
      } finally {
        setIsLoading(false);
      }
    };
    loadCompany();
  }, []);

  useEffect(() => {
    if (coords) {
      setLatitude(coords.latitude.toString());
      setLongitude(coords.longitude.toString());
    }
  }, [coords]);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      const requiredFields = ["fullName", "email", "phoneNumber", "address"];
      const newErrors = requiredFields.reduce((acc, field) => {
        if (!formData.get(field)) acc[field] = `يرجى إدخال ${field}.`;
        return acc;
      }, {} as { [key: string]: string });

      if (Object.keys(newErrors).length) return setErrors(newErrors);

      formData.set("latitude", latitude);
      formData.set("longitude", longitude);
      await saveCompany(formData);
      toast.success("تم حفظ بيانات الشركة بنجاح!");
    } catch (error) {
      toast.error("فشل حفظ بيانات الشركة.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6 text-center">إعدادات المنصة</h1>

      {isLoading ? (
        <SettingsSkeleton />
      ) : (
        <form action={handleSubmit} className="space-y-6">
          <GeneralInfoSection company={company} errors={errors} />
          <SocialMediaSection company={company} />
          {/* {geoLatitude} -- {geoLongitude} */}
          <LocationSection
            company={company}
            errors={errors}
            // coords={coords}
            isGeolocationAvailable={isGeolocationAvailable}
            isGeolocationEnabled={isGeolocationEnabled}
            latitude={latitude}
            longitude={longitude}
            setLatitude={setLatitude}
            setLongitude={setLongitude}


          />
          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      )}
    </div>
  );
}