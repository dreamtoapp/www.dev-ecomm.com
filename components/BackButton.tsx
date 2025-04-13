"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ label = "الرجوع" }: { label?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all duration-200 shadow-md"
    >
      <ArrowLeft className="h-5 w-5 text-gray-600" />
      <span className="font-medium">{label}</span>
    </button>
  );
}
