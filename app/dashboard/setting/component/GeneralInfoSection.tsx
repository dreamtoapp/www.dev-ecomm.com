import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Company } from "../../../../types/company";

const GeneralInfoSection = ({ company, errors }: { company: Company | null; errors: any }) => (
  <Card>
    <CardHeader>
      <CardTitle>المعلومات العامة</CardTitle>
    </CardHeader>
    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="fullName">الاسم الكامل</Label>
        <Input
          id="fullName"
          name="fullName"
          defaultValue={company?.fullName}
          aria-invalid={!!errors.fullName}
        />
        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
      </div>
      <div>
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={company?.email}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <Label htmlFor="bio">روئيتنا</Label>
        <Input id="bio" name="bio" defaultValue={company?.bio} />
      </div>
      <div>
        <Label htmlFor="phoneNumber">رقم الهاتف</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          defaultValue={company?.phoneNumber}
          aria-invalid={!!errors.phoneNumber}
        />
        {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
      </div>
    </CardContent>
  </Card>
);

export default GeneralInfoSection;