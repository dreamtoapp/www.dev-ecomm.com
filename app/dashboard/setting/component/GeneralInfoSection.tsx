import {
  Globe,
  ImageIcon,
  Info,
  Mail,
  MessageSquareText,
  Phone,
  User,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

import ImageUpload from '@/components/ImageUpload';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { Company } from '../../../../types/company';

interface GeneralInfoSectionProps {
  company: Company | null;
  errors: { [key: string]: string };
  onLogoUpload: (file: File | null) => void; // إضافة prop لتحديث حالة الصورة المرفوعة
}

const GeneralInfoSection = ({
  company,
  errors,
  onLogoUpload,
}: GeneralInfoSectionProps) => {
  return (
    <Card className="relative">
      <CardHeader>
    
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          المعلومات العامة
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="fullName" className="flex items-center gap-1">
              <User className="w-4 h-4" />
              الاسم الكامل
            </Label>
            <span
              className="text-muted-foreground text-xs cursor-help"
              title="الاسم الرسمي المسجل للشركة"
            >
              <Info className="w-3 h-3" />
            </span>
          </div>
          <div className="relative">
            <Input
              id="fullName"
              name="fullName"
              defaultValue={company?.fullName}
              aria-invalid={!!errors.fullName}
              className="pl-8 rtl:pr-8 rtl:pl-0"
            />
            <div className="absolute left-2 top-1/2 -translate-y-1/2 rtl:right-2 rtl:left-auto">
              <User className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
          <p className="text-muted-foreground text-xs">
            يجب أن يتطابق مع الوثائق الرسمية
          </p>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="email" className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              البريد الإلكتروني
            </Label>
          </div>
          <div className="relative">
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={company?.email}
              aria-invalid={!!errors.email}
              className="pl-8 rtl:pr-8 rtl:pl-0"
            />
            <div className="absolute left-2 top-1/2 -translate-y-1/2 rtl:right-2 rtl:left-auto">
              <Mail className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
          <p className="text-muted-foreground text-xs">
            البريد الرسمي للشركة
          </p>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="bio" className="flex items-center gap-1">
              <MessageSquareText className="w-4 h-4" />
              روئيتنا
            </Label>
          </div>
          <div className="relative">
            <Input
              id="bio"
              name="bio"
              defaultValue={company?.bio}
              className="pl-8 rtl:pr-8 rtl:pl-0"
            />
            <div className="absolute left-2 top-1/2 -translate-y-1/2 rtl:right-2 rtl:left-auto">
              <MessageSquareText className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          <p className="text-muted-foreground text-xs">
            اكتب رؤية الشركة بشكل مختصر (حد أقصى 255 حرف)
          </p>
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="phoneNumber" className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              رقم الهاتف
            </Label>
          </div>
          <div className="relative">
            <Input
              id="phoneNumber"
              name="phoneNumber"
              defaultValue={company?.phoneNumber}
              aria-invalid={!!errors.phoneNumber}
              className="pl-20 rtl:pr-20 rtl:pl-0"
              inputMode="tel"
              pattern="[0-9]*"
            />
            <div className="absolute left-2 top-1/2 -translate-y-1/2 rtl:right-2 rtl:left-auto">
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-xs">+966</span>
                <Phone className="w-4 h-4" />
              </div>
            </div>
          </div>
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        {/* WhatsApp Number */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="whatsappNumber" className="flex items-center gap-1">
              <FaWhatsapp className="w-4 h-4" />
              رقم الواتساب
            </Label>
          </div>
          <div className="relative">
            <Input
              id="whatsappNumber"
              name="whatsappNumber"
              defaultValue={company?.whatsappNumber}
              aria-invalid={!!errors.whatsappNumber}
              className="pl-20 rtl:pr-20 rtl:pl-0"
              inputMode="tel"
              pattern="[0-9]*"
            />
            <div className="absolute left-2 top-1/2 -translate-y-1/2 rtl:right-2 rtl:left-auto">
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-xs">+966</span>
                <FaWhatsapp className="w-4 h-4" />
              </div>
            </div>
          </div>
          {errors.whatsappNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.whatsappNumber}</p>
          )}
          <p className="text-muted-foreground text-xs">
            مثال: 9665xxxxxxxx (بدون علامة + أو مسافات)
          </p>
        </div>
            <div className="space-y-2 md:col-span-2 w-fit">
          <Label className="block">
            <span className="flex items-center gap-1 mb-2">
              <ImageIcon className="w-4 h-4" />
              شعار الشركة
            </span>
            <ImageUpload
              initialImage={company?.logo}
              onImageUpload={onLogoUpload} // تمرير الدالة لتحديث حالة الصورة المرفوعة
              aspectRatio={1}
              maxSizeMB={2}
              allowedTypes={['image/png', 'image/jpeg', 'image/webp']}
              uploadLabel="انقر لرفع الصورة"
              previewType="contain"
              className="h-36"
              alt="شعار الشركة"
              minDimensions={{ width: 500, height: 500 }}
              error={errors.logo}
            />
            {errors.logo && (
              <p className="text-red-500 text-xs mt-1">{errors.logo}</p>
            )}
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralInfoSection;