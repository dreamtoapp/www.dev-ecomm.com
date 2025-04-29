"use client";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";

interface AnalyticsOrder {
  orderId: string;
  date: string;
  customer: string;
  quantity: number;
  status: string;
  price: number;
}

interface AnalyticsData {
  productName: string;
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  bestSeller: string;
  salesByMonth: { month: string; orders: number; sales: number; revenue: number }[];
  orderHistory: AnalyticsOrder[];
}

interface Company {
  fullName: string;
  address: string;
  phoneNumber: string;
  email: string;
  taxNumber: string;
  website: string;
  logo: string;
}

interface ExportAnalyticsPdfButtonProps {
  data: AnalyticsData;
  fileName?: string;
  className?: string;
  company?: Company;
}

// Helper to fetch font as base64
async function fetchFontBase64(url: string): Promise<string> {
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  let binary = '';
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Utility: Convert Western digits to Arabic-Indic
function toArabicDigits(str: string) {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return str.replace(/[0-9]/g, d => arabicDigits[parseInt(d)]);
}

export default function ExportAnalyticsPdfButton({ data, fileName = "تقرير-تحليلات-المنتج.pdf", className = "", company }: ExportAnalyticsPdfButtonProps) {
  const handleExport = useCallback(async () => {
    // Create jsPDF instance (must be before any doc usage!)
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "A4" });
    // --- Robust Arabic Font Embedding ---
    const fontUrl = "/fonts/NotoNaskhArabic-Regular.ttf";
    let fontBase64 = "";
    try {
      fontBase64 = await fetchFontBase64(fontUrl);
      // Register font for jsPDF
      // @ts-ignore
      doc.addFileToVFS("NotoNaskhArabic-Regular.ttf", fontBase64);
      // @ts-ignore
      doc.addFont("NotoNaskhArabic-Regular.ttf", "NotoNaskhArabic", "normal");
    } catch (e) {
      alert("خطأ في تحميل خط اللغة العربية. سيتم استخدام الخط الافتراضي وقد تظهر مشاكل في العرض.");
    }
    doc.setFont("NotoNaskhArabic", "normal");
    doc.setFontSize(12);

    // --- DEBUG: Log company data before rendering ---
    console.log('Exporting PDF with company data:', company);

    // --- Company Info Section (Logo right, info left, visually grouped, RTL) ---
    let y = 40;
    if (company) {
      const pageWidth = doc.internal.pageSize.getWidth();
      const logoSize = 60;
      const margin = 40;
      let logoX = pageWidth - logoSize - margin;
      let logoY = y;
      let infoX = margin;
      let infoY = y + 10;
      doc.setFont("NotoNaskhArabic", "normal");
      doc.setFontSize(14);
      // Draw logo on the right
      if (company.logo) {
        try {
          const logoRes = await fetch(company.logo);
          const logoBlob = await logoRes.blob();
          const logoReader = new FileReader();
          const logoDataUrl: string = await new Promise((resolve, reject) => {
            logoReader.onloadend = () => resolve(logoReader.result as string);
            logoReader.onerror = reject;
            logoReader.readAsDataURL(logoBlob);
          });
          doc.addImage(logoDataUrl, 'PNG', logoX, logoY, logoSize, logoSize, undefined, 'FAST');
        } catch (e) {}
      }
      // Always show all company fields, even if empty
      let line = 0;
      const companyFields = [
        company.fullName || '-',
        company.address || '-',
        company.phoneNumber || '-',
        company.email || '-',
        company.taxNumber || '-',
        company.website || '-',
      ];
      for (const field of companyFields) {
        doc.text(field, infoX, infoY + 10 + line * 15, { align: "left" });
        line++;
      }
      y += Math.max(logoSize, 10 + line * 15) + 10;
      doc.setDrawColor(200);
      doc.line(margin, y, pageWidth - margin, y);
      y += 15;
    } else {
      y = 100;
    }
    // --- End Company Info ---

    // --- Report Title & Product Info ---
    doc.setFont("NotoNaskhArabic", "normal");
    doc.setFontSize(20);
    doc.text("تقرير تحليلات المنتج", doc.internal.pageSize.getWidth() - 40, y + 20, { align: "right" });
    doc.setFontSize(12);
    doc.text(`اسم المنتج: ${data.productName}`, doc.internal.pageSize.getWidth() - 40, y + 50, { align: "right" });
    // Date and time as numbers only (no Arabic text)
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const dateStr = `${year}/${month}/${day}`;
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;
    doc.setFont("NotoNaskhArabic", "normal");
    doc.text(`التاريخ: ${dateStr}`, doc.internal.pageSize.getWidth() - 120, y + 70, { align: "right" });
    doc.text(`الوقت: ${timeStr}`, doc.internal.pageSize.getWidth() - 120, y + 90, { align: "right" });
    y += 110;
    // --- Summary Table ---
    autoTable(doc, {
      head: [["إجمالي المبيعات", "إجمالي الطلبات", "إجمالي العملاء", "الأكثر مبيعًا"]],
      body: [[
        data.totalSales,
        data.totalOrders,
        data.totalCustomers,
        data.bestSeller,
      ]],
      startY: y,
      margin: { right: 40, left: 40 },
      styles: { font: "NotoNaskhArabic", halign: "right", fontStyle: "normal", fontSize: 12 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: "normal" },
      bodyStyles: { fontStyle: "normal" },
      theme: "striped",
      didParseCell: (data) => {
        data.cell.styles.font = "NotoNaskhArabic";
      },
      didDrawCell: (data) => {
        data.cell.styles.font = "NotoNaskhArabic";
      },
    });

    // --- Sales by Month Table ---
    autoTable(doc, {
      head: [["الشهر", "عدد الطلبات", "عدد المبيعات", "الإيرادات (ر.س)"]],
      body: data.salesByMonth.map(row => [row.month, row.orders, row.sales, row.revenue]),
      startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : y + 60,
      margin: { right: 40, left: 40 },
      styles: { font: "NotoNaskhArabic", halign: "right", fontSize: 11 },
      headStyles: { fillColor: [52, 152, 219], textColor: 255, fontStyle: "normal" },
      bodyStyles: { fontStyle: "normal" },
      theme: "striped",
      didParseCell: (data) => {
        data.cell.styles.font = "NotoNaskhArabic";
      },
      didDrawCell: (data) => {
        data.cell.styles.font = "NotoNaskhArabic";
      },
    });

    // --- Order History Table (if exists) ---
    if (data.orderHistory && data.orderHistory.length > 0) {
      autoTable(doc, {
        head: [["رقم الطلب", "التاريخ", "العميل", "الكمية", "الحالة", "السعر (ر.س)"]],
        body: data.orderHistory.map(order => [order.orderId, order.date, order.customer, order.quantity, order.status, order.price]),
        startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 20 : y + 100,
        margin: { right: 40, left: 40 },
        styles: { font: "NotoNaskhArabic", halign: "right", fontSize: 10 },
        headStyles: { fillColor: [127, 140, 141], textColor: 255, fontStyle: "normal" },
        bodyStyles: { fontStyle: "normal" },
        theme: "striped",
        didParseCell: (data) => {
          data.cell.styles.font = "NotoNaskhArabic";
        },
        didDrawCell: (data) => {
          data.cell.styles.font = "NotoNaskhArabic";
        },
      });
    }

    // --- Footer ---
    doc.setFont("NotoNaskhArabic", "normal");
    doc.setFontSize(10);
    doc.text("www.amwag.com 2025", doc.internal.pageSize.getWidth() - 40, doc.internal.pageSize.getHeight() - 30, { align: "right" });

    doc.save(fileName);
  }, [data, fileName, company]);

  return (
    <Button onClick={handleExport} className={className} variant="outline">
      <span className="ml-1">تصدير PDF</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v4.125c0 .621-.504 1.125-1.125 1.125H5.625A1.125 1.125 0 0 1 4.5 18.375V14.25m15 0L12 19.5m7.5-5.25L12 19.5m0 0l-7.5-5.25M12 19.5V4.5" />
      </svg>
    </Button>
  );
}
