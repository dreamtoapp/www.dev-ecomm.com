"use client";
import React from 'react';

interface DownloadDataButtonProps {
  targetRef: React.RefObject<HTMLElement>;
  fileName?: string;
  buttonText?: string;
  className?: string;
}

// This component is a lightweight alternative to PDF export
const DownloadDataButton: React.FC<DownloadDataButtonProps> = ({
  buttonText = "تصدير البيانات",
  className = "",
}) => {
  return (
    <button
      type="button"
      className={`px-4 py-2 rounded-lg bg-gray-400 text-white font-bold shadow cursor-not-allowed opacity-60 ${className}`}
      aria-label="تصدير البيانات"
      disabled
      title="ميزة تصدير البيانات غير مفعلة حالياً"
    >
      {buttonText}
    </button>
  );
};

export default DownloadDataButton;
