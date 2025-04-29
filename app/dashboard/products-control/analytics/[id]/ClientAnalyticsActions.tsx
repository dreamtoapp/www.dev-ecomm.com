"use client";
import { Printer, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClientAnalyticsActions({ analytics, id }: { analytics: any; id: string }) {
  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };
  const handleExport = () => {
    if (!analytics) return;
    const csvRows = [
      ["الشهر", "المبيعات"],
      ...analytics.salesByMonth.map((row: any) => [row.month, row.sales]),
    ];
    const csv = csvRows.map((r) => r.join(",")).join("\n");
    if (typeof window !== "undefined") {
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `analytics_${id}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };
  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={handlePrint} title="طباعة التحليلات"><Printer className="w-5 h-5" /> <span className="sr-only">طباعة</span></Button>
      <Button variant="outline" onClick={handleExport} title="تصدير التحليلات"><FileDown className="w-5 h-5" /> <span className="sr-only">تصدير</span></Button>
    </div>
  );
}
