import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Company } from "../../../../types/company";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";



const SocialMediaSection = ({ company }: { company: Company | null }) => (
  <Card>
    <CardHeader>
      <CardTitle>وسائل التواصل الاجتماعي</CardTitle>
    </CardHeader>
    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { id: "twitter", icon: Twitter, label: "تويتر" },
        { id: "linkedin", icon: Linkedin, label: "لينكد إن" },
        { id: "facebook", icon: Facebook, label: "فيسبوك" },
        { id: "instagram", icon: Instagram, label: "إنستغرام" },
      ].map(({ id, icon: Icon, label }) => (
        <div key={id}>
          <Label htmlFor={id}>
            <Icon className="inline-block mr-2" /> {label}
          </Label>
          <Input
            id={id}
            name={id}
            defaultValue={company?.[id as keyof Company]}
            placeholder={`أدخل رابط ${label}`}
          />
        </div>
      ))}
    </CardContent>
  </Card>
);

export default SocialMediaSection;