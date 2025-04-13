"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const UI_TEXT = {
  title: "الخطوة 1: رقم الجوال",
  description:
    "يرجى إدخال رقم جوالك المسجل لدينا. إذا كنت مستخدمًا جديدًا، سنقوم بإنشاء حساب لك.",
  noteForNewUsers:
    "إذا لم تكن مسجلًا من قبل، سيتم حفظ بياناتك بشكل آمن لتسهيل استخدامك في المستقبل.",
  placeholder: "05XXXXXXXX",
  error: "رقم الهاتف غير صحيح (مثال: 05XXXXXXXX)",
  nextButton: "التالي",
  loadingButton: "جاري التحقق...",
};

interface Step1PhoneProps {
  onNext: (phone: string) => void;
  loading: boolean;
}

const Step1Phone = ({ onNext, loading }: Step1PhoneProps) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!phone.match(/^05\d{8}$/)) {
      setError(UI_TEXT.error);
      return;
    }
    setError("");
    onNext(phone);
  };

  return (
    <Card className="w-full max-w-md mx-auto p-4 bg-border text-foreground rounded-lg shadow-sm border border-muted">
      <CardHeader>
        <CardTitle className="text-xl font-bold ">{UI_TEXT.title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {UI_TEXT.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder={UI_TEXT.placeholder}
          maxLength={10}
          autoFocus
          className="bg-background text-foreground border-muted focus-visible:ring-primary"
        />
        {error && <p className="text-destructive text-sm">{error}</p>}
        <p className="text-xs text-muted-foreground animate-pulse">
          {UI_TEXT.noteForNewUsers}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={handleSubmit}
          className="w-full bg-primary text-background hover:bg-primary/90 transition-colors"
          disabled={phone.length !== 10 || loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {UI_TEXT.loadingButton}
            </div>
          ) : (
            UI_TEXT.nextButton
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Step1Phone;
