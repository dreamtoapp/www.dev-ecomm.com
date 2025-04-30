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

interface ProductPerformanceProps {
  products: any[];
  kpis: { label: string; value: any }[];
  chartData: { name: string; quantitySold: number; revenue: number }[];
  initialFrom?: string;
  initialTo?: string;
}

export default function ProductPerformanceClient({ products, kpis, chartData, initialFrom, initialTo }: ProductPerformanceProps) {
  const [from, setFrom] = useState(initialFrom || "");
  const [to, setTo] = useState(initialTo || "");

  // For now, just reload with new query params (server action)
  const handleFilter = () => {
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    window.location.search = params.toString();
  };

  // Helper: Format numbers/currency for Arabic display
  const formatValue = (label: string, value: any) => {
    if (typeof value === 'number' || (typeof value === 'string' && !isNaN(Number(value)))) {
      // Special case: revenue
      if (label.includes('إيراد')) {
        return Number(value).toLocaleString('ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ر.س';
      }
      return Number(value).toLocaleString('ar-EG');
    }
    return value;
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-6">تقرير أداء المنتجات</h1>

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
          <Card key={kpi.label} className="bg-gradient-to-tr from-blue-50 to-blue-100 text-center">
            <CardContent className="py-4">
              <div className="text-lg font-semibold mb-2">{kpi.label}</div>
              <div className="text-2xl font-bold text-blue-700">{formatValue(kpi.label, kpi.value)}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card>
        <CardContent className="py-6">
          <div className="mb-4 text-lg font-semibold">مخطط المبيعات حسب المنتج</div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-25} textAnchor="end" height={60} interval={0} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantitySold" fill="#2563eb" name="الكمية المباعة" />
                <Bar dataKey="revenue" fill="#38bdf8" name="الإيرادات (ر.س)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Product Table */}
      <Card>
        <CardContent className="overflow-x-auto py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المنتج</TableHead>
                <TableHead>المورد</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead>الكمية المباعة</TableHead>
                <TableHead>الإيرادات</TableHead>
                <TableHead>عدد الطلبات</TableHead>
                <TableHead>الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded object-cover border" />}
                      <span>{p.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{p.supplierName || '-'}</TableCell>
                  <TableCell>{p.price.toLocaleString()} ر.س</TableCell>
                  <TableCell>{p.quantitySold}</TableCell>
                  <TableCell>{p.revenue.toLocaleString()} ر.س</TableCell>
                  <TableCell>{p.orderCount}</TableCell>
                  <TableCell>
                    {p.outOfStock ? (
                      <span className="text-red-600 font-semibold">غير متوفر</span>
                    ) : p.published ? (
                      <span className="text-green-600 font-semibold">متاح</span>
                    ) : (
                      <span className="text-gray-600">غير منشور</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
