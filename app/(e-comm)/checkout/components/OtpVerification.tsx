// components/Checkout/OtpVerification.tsx
"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function OtpVerification({
  showOtpDialog,
  setShowOtpDialog,
  otp,
  setOtp,
  handleVerifyOtp,
}: {
  showOtpDialog: boolean;
  setShowOtpDialog: (value: boolean) => void;
  otp: string;
  setOtp: (value: string) => void;
  handleVerifyOtp: () => void;
}) {
  return (
    <Dialog open={showOtpDialog} onOpenChange={setShowOtpDialog}>
      <DialogContent className="max-w-sm flex flex-col items-center" dir="ltr">
        <DialogHeader>
          <DialogTitle>التحقق من الرمز المؤقت (OTP)</DialogTitle>
        </DialogHeader>
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <Button onClick={handleVerifyOtp} className="w-full mt-2">
          التحقق
        </Button>
      </DialogContent>
    </Dialog>
  );
}
