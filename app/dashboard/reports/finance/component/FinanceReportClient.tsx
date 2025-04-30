"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface FinanceReportProps {
  kpis: { label: string; value: any }[];
  trendData: { date: string; revenue: number; expenses: number }[];
  transactions: { type: string; amount: number; note: string; createdAt: Date }[];
  initialFrom?: string;
  initialTo?: string;
}

export default function FinanceReportClient({ kpis, trendData, transactions, initialFrom, initialTo }: FinanceReportProps) {
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
      return Number(value).toLocaleString('ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ر.س';
    }
    return value;
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-6">التقارير المالية</h1>

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="bg-gradient-to-tr from-yellow-50 to-yellow-100 text-center">
            <CardContent className="py-4">
              <div className="text-lg font-semibold mb-2">{kpi.label}</div>
              <div className="text-2xl font-bold text-yellow-700">{formatValue(kpi.label, kpi.value)}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trends Chart */}
      <Card>
        <CardContent className="py-6">
          <div className="mb-4 text-lg font-semibold">اتجاه الإيرادات والمصروفات (يومي)</div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#22c55e" name="الإيرادات (ر.س)" />
                <Line type="monotone" dataKey="expenses" stroke="#f59e42" name="المصروفات (ر.س)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardContent className="overflow-x-auto py-4">
          <div className="mb-2 text-lg font-semibold">جدول المعاملات المالية (أحدث 100)</div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>النوع</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead>التاريخ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((t, idx) => (
                <TableRow key={idx}>
                  <TableCell>{t.type}</TableCell>
                  <TableCell>{Number(t.amount).toLocaleString('ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ر.س</TableCell>
                  <TableCell>{t.note}</TableCell>
                  <TableCell>{new Date(t.createdAt).toLocaleDateString('ar-EG')}</TableCell>
                </TableRow>
              ))}
              {transactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-400">لا توجد بيانات</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
