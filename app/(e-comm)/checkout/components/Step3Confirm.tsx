"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import TermsDialog from "./TermsDialog";

export const Step3Confirm = ({
  onPrevious,
  onConfirmOrder,
  isLoading,
}: {
  onPrevious: () => void;
  onConfirmOrder: () => void;
  isLoading: boolean;
}) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreed(e.target.checked);
  };

  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold text-foreground">
        هل أنت متأكد من تفاصيل الطلب؟
      </p>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2 gap-2">
          <input
            type="checkbox"
            id="agreement"
            checked={isAgreed}
            onChange={handleAgreementChange}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label htmlFor="agreement" className="text-sm text-foreground">
            أوافق على الشروط والأحكام
          </label>
        </div>
        <TermsDialog />
      </div>
      <div className="flex gap-2">
        <Button onClick={onPrevious} variant="outline" className="w-full">
          السابق
        </Button>
        <Button
          onClick={onConfirmOrder}
          className="w-full bg-primary text-white"
          disabled={isLoading || !isAgreed}
        >
          {isLoading ? "جاري التأكيد..." : "تأكيد الطلب"}
        </Button>
      </div>
    </div>
  );
};
