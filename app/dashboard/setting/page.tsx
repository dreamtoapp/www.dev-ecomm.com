"use client";
import React, {
  useEffect,
  useState,
} from 'react';

import { useGeolocated } from 'react-geolocated';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { Company } from '../../../types/company';
import { fetchCompany } from './actions/fetchCompany';
import { saveCompany } from './actions/saveCompnay';
import GeneralInfoSection from './component/GeneralInfoSection';
import LocationSection from './component/LocationSection';
import SettingsSkeleton from './component/SettingsSkeleton';
import SocialMediaSection from './component/SocialMediaSection';

// Main Component
export default function SettingsPage() {
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [uploadedLogo, setUploadedLogo] = useState<File | null>(null);

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
  }, []); // Dependency array ensures this runs only once on mount

  useEffect(() => {
    if (coords && coords.latitude && coords.longitude) {
      setLatitude(coords.latitude.toString());
      setLongitude(coords.longitude.toString());
    }
  }, [coords]); // Dependency array ensures this runs only when `coords` changes

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      const requiredFields = ["fullName", "email", "phoneNumber", "address"];
      const newErrors = requiredFields.reduce((acc, field) => {
        if (!formData.get(field)) acc[field] = `يرجى إدخال ${field}.`;
        return acc;
      }, {} as { [key: string]: string });

      if (Object.keys(newErrors).length) {
        setErrors(newErrors);
        return;
      }

      formData.set("latitude", latitude);
      formData.set("longitude", longitude);

      if (uploadedLogo) {
        formData.set("logo", uploadedLogo);
      }

       
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
        <form action={handleSubmit} className="space-y-6 relative">
          {isSubmitting && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
            </div>
          )}
          <GeneralInfoSection
            company={company}
            errors={errors}
            onLogoUpload={(file) => {
              setUploadedLogo(file);
            }}
          />
          <SocialMediaSection company={company} />
          <LocationSection
            company={company}
            errors={errors}
            isGeolocationAvailable={isGeolocationAvailable}
            isGeolocationEnabled={isGeolocationEnabled}
            latitude={latitude}
            longitude={longitude}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full mr-2"></div>
                جاري الحفظ...
              </div>
            ) : (
              "حفظ التغييرات"
            )}
          </Button>
        </form>
      )}
    </div>
  );
}