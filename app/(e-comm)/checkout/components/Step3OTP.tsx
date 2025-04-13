// Step3OTP.tsx
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Step3OTPProps {
  phone: string;
  onVerify: () => void;
  onResend: () => void;
  onPrevious: () => void;
}

const Step3OTP = ({ phone, onVerify, onResend, onPrevious }: Step3OTPProps) => {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [error, setError] = useState("");

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = async () => {
    if (otp === "123456") {
      onVerify();
    } else {
      setError("الكود غير صحيح");
    }
  };

  return (
    <div className="space-y-4">
      <p>تم إرسال كود التأكيد إلى {phone}</p>
      <Input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="ادخل كود التأكيد"
        autoFocus
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex gap-4">
        <Button
          onClick={handleVerify}
          className="flex-1 bg-primary"
          disabled={!otp}
        >
          تأكيد
        </Button>
        <Button onClick={onPrevious} variant="outline" className="flex-1">
          السابق
        </Button>
      </div>
      <button
        onClick={onResend}
        disabled={countdown > 0}
        className="text-blue-500"
      >
        {countdown > 0
          ? `إعادة الإرسال بعد ${countdown} ثانية`
          : "إعادة الإرسال"}
      </button>
    </div>
  );
};

export default Step3OTP;
