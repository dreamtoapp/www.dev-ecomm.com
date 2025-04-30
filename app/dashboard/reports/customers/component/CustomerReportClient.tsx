"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface CustomerReportProps {
  customers: any[];
  kpis: { label: string; value: any }[];
  chartData: { name: string; orderCount: number; totalSpend: number }[];
  initialFrom?: string;
  initialTo?: string;
}

export default function CustomerReportClient({ customers, kpis, chartData, initialFrom, initialTo }: CustomerReportProps) {
  const [from, setFrom] = useState(initialFrom || "");
  const [to, setTo] = useState(initialTo || "");

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    window.location.search = params.toString();
  };

  // Helper: Format numbers/currency for Arabic display
  const formatValue = (label: string, value: any) => {
    if (typeof value === 'number' || (typeof value === 'string' && !isNaN(Number(value)))) {
      if (label.includes('إنفاق')) {
        return Number(value).toLocaleString('ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ر.س';
      }
      return Number(value).toLocaleString('ar-EG');
    }
    return value;
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-6">تقرير العملاء</h1>

      {/* Filter Panel */}
      <Card className="mb-4">
        <CardContent className="flex flex-col md:flex-row gap-4 py-4 items-end">
          <div>
            <label className="block mb-1 text-sm font-medium">من تاريخ</label>
            <Input type="date" value={from} onChange={e => setFrom(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">إلى تاريخ</label>
            <Input type="date" value={to} onChange={e => setTo(e.target.value)} />
          </div>
          <Button className="mt-4 md:mt-0" onClick={handleFilter}>تطبيق الفلتر</Button>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="bg-gradient-to-tr from-green-50 to-green-100 text-center">
            <CardContent className="py-4">
              <div className="text-lg font-semibold mb-2">{kpi.label}</div>
              <div className="text-2xl font-bold text-green-700">{formatValue(kpi.label, kpi.value)}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card>
        <CardContent className="py-6">
          <div className="mb-4 text-lg font-semibold">أفضل العملاء (حسب عدد الطلبات)</div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-25} textAnchor="end" height={60} interval={0} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orderCount" fill="#22c55e" name="عدد الطلبات" />
                <Bar dataKey="totalSpend" fill="#38bdf8" name="إجمالي الإنفاق (ر.س)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Customer Table */}
      <Card>
        <CardContent className="overflow-x-auto py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الاسم</TableHead>
                <TableHead>رقم الجوال</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>عدد الطلبات</TableHead>
                <TableHead>إجمالي الإنفاق</TableHead>
                <TableHead>تاريخ التسجيل</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.phone}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.orderCount}</TableCell>
                  <TableCell>{Number(c.totalSpend).toLocaleString('ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ر.س</TableCell>
                  <TableCell>{new Date(c.createdAt).toLocaleDateString('ar-EG')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
