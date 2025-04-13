"use client";
import {
  useEffect,
  useState,
} from 'react'

import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'

interface UserSession {
  user?: {
    email?: string;
    phone?: string;
    name?: string;
  };
}

export default function VerifyPage() {
  const { data: session, status } = useSession() as { data: UserSession; status: string };
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timer, setTimer] = useState(60);
  const [selectedMethod, setSelectedMethod] = useState<'sms' | 'whatsapp' | 'email' | null>(null);
  const [isOTPSent, setIsOTPSent] = useState(false);

  // Get contact info from session
  const userEmail = session?.user?.email || '';
  const userPhone = session?.user?.phone || '';

  const handleSendOTP = async () => {
    setError('');
    setSuccess('');

    if (!selectedMethod) {
      setError('الرجاء اختيار طريقة الإرسال');
      return;
    }

    // Validate contact info exists in session
    if ((selectedMethod === 'sms' || selectedMethod === 'whatsapp') && !userPhone) {
      setError('لم يتم العثور على رقم هاتف مسجل في الحساب');
      return;
    }

    if (selectedMethod === 'email' && !userEmail) {
      setError('لم يتم العثور على بريد إلكتروني مسجل في الحساب');
      return;
    }

    setIsLoading(true);

    // Simulate API call - Replace with actual OTP sending logic
    setTimeout(() => {
      setIsLoading(false);
      setIsOTPSent(true);
      setSuccess(`تم إرسال الرمز إلى ${selectedMethod === 'email' ? userEmail : userPhone}`);
      setTimer(60);
    }, 2000);
  };

  const handleResend = () => {
    setTimer(60);
    handleSendOTP();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (otp.length !== 4) {
      setError('الرجاء إدخال رمز التحقق المكون من 4 أرقام');
      return;
    }

    setIsLoading(true);

    // Simulate verification - Replace with actual verification logic
    setTimeout(() => {
      setIsLoading(false);
      setSuccess('تم التحقق بنجاح! جاري التوجيه...');
      // Add redirect logic here
    }, 2000);
  };

  useEffect(() => {
    if (timer > 0 && isOTPSent) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, isOTPSent]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">يرجى تسجيل الدخول</CardTitle>
            <CardDescription>
              يجب أن تكون مسجلاً الدخول للوصول إلى هذه الصفحة
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen" dir="rtl">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">تأكيد الرقم السري</CardTitle>
          <CardDescription>
            {isOTPSent
              ? `أدخل الرمز المرسل إلى ${selectedMethod === 'email' ? 'بريدك الإلكتروني' : 'رقمك'}`
              : 'اختر طريقة الإرسال'}
          </CardDescription>
        </CardHeader>

        {!isOTPSent ? (
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={selectedMethod === 'sms' ? 'default' : 'outline'}
                onClick={() => setSelectedMethod('sms')}
                className="flex-1"
                disabled={!userPhone}
              >
                SMS
                {!userPhone && <span className="text-xs mr-1">(غير متوفر)</span>}
              </Button>
              <Button
                variant={selectedMethod === 'whatsapp' ? 'default' : 'outline'}
                onClick={() => setSelectedMethod('whatsapp')}
                className="flex-1"
                disabled={!userPhone}
              >
                WhatsApp
                {!userPhone && <span className="text-xs mr-1">(غير متوفر)</span>}
              </Button>
              <Button
                variant={selectedMethod === 'email' ? 'default' : 'outline'}
                onClick={() => setSelectedMethod('email')}
                className="flex-1"
                disabled={!userEmail}
              >
                Email
                {!userEmail && <span className="text-xs mr-1">(غير متوفر)</span>}
              </Button>
            </div>

            {selectedMethod && (
              <div className="text-center p-4 bg-gray-100 rounded-lg">
                <p className="font-medium">سيتم الإرسال إلى:</p>
                <p className="text-primary">
                  {selectedMethod === 'email' ? userEmail : userPhone}
                </p>
              </div>
            )}

            <Button
              className="w-full"
              onClick={handleSendOTP}
              disabled={!selectedMethod || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري الإرسال...
                </>
              ) : 'إرسال الرمز'}
            </Button>

            {error && <p className="text-red-500 text-center text-sm">{error}</p>}
            {success && <p className="text-green-500 text-center text-sm">{success}</p>}
          </CardContent>
        ) : (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center" dir="ltr">
                <InputOTP
                  maxLength={4}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  disabled={isLoading}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSeparator />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="text-center text-sm">
                لم تستلم الرمز؟{' '}
                <Button
                  type="button"
                  variant="link"
                  className="p-0 text-primary"
                  onClick={handleResend}
                  disabled={timer > 0 || isLoading}
                >
                  إعادة الإرسال {timer > 0 && `(${timer})`}
                </Button>
              </div>

              {error && <p className="text-red-500 text-center text-sm">{error}</p>}
              {success && <p className="text-green-500 text-center text-sm">{success}</p>}
            </CardContent>

            <CardContent>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || otp.length !== 4}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري التحقق...
                  </>
                ) : 'تأكيد الرمز'}
              </Button>
            </CardContent>
          </form>
        )}
      </Card>
    </div>
  );
}