"use client";
import React from "react";

interface DownloadPdfButtonProps {
  targetRef: React.RefObject<HTMLElement>;
  fileName?: string;
  buttonText?: string;
  className?: string;
}

// This component is currently disabled because PDF export is not in use.
const DownloadPdfButton: React.FC<DownloadPdfButtonProps> = ({
  buttonText = "تحميل PDF",
  className = "",
}) => {
  return (
    <button
      type="button"
      className={`px-4 py-2 rounded-lg bg-gray-400 text-white font-bold shadow cursor-not-allowed opacity-60 ${className}`}
      aria-label="تحميل ملف PDF"
      disabled
      title="ميزة تصدير PDF غير مفعلة حالياً"
    >
      {buttonText}
    </button>
  );
};

export default DownloadPdfButton;
