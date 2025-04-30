"use client";
import { useState, useMemo, useEffect } from "react";
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts";

const STATUS_COLORS = ["#2563eb", "#22c55e", "#f59e42", "#f43f5e", "#a855f7", "#14b8a6"];

interface OrderAnalyticsProps {
  orders: any[];
  kpis: { label: string; value: any }[];
  statusChartData: { name: string; value: number }[];
  topProducts: { name: string; count: number }[];
  trendData: { date: string; orders: number; revenue: number }[];
  initialFrom?: string;
  initialTo?: string;
}

export default function OrderAnalyticsClient({ orders, kpis, statusChartData, topProducts, trendData, initialFrom, initialTo }: OrderAnalyticsProps) {
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
    if (label === 'أعلى طلب' && value && typeof value === 'object') {
      // Show all details: amount, orderNumber, customer
      return (
        <div className="flex flex-col items-center gap-1 rtl:text-right">
          <span className="text-xl font-bold text-blue-700">
            {Number(value.amount).toLocaleString('ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ر.س
          </span>
          <span className="text-xs text-gray-500">رقم الطلب: <span dir="ltr">{value.orderNumber}</span></span>
          <span className="text-xs text-gray-500">العميل: {value.customer}</span>
        </div>
      );
    }
    if (typeof value === 'number' || (typeof value === 'string' && !isNaN(Number(value)))) {
      if (label.includes('إيراد') || label.includes('قيمة')) {
        return Number(value).toLocaleString('ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ر.س';
      }
      return Number(value).toLocaleString('ar-EG');
    }
    return value;
  };

  // Pagination & Search State
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  // Filtered & paginated orders
  const filteredOrders = useMemo(() => {
    if (!search) return orders;
    const s = search.toLowerCase();
    return orders.filter(
      (o) =>
        (o.orderNumber?.toString().toLowerCase().includes(s) ||
         o.customer?.name?.toLowerCase().includes(s))
    );
  }, [orders, search]);

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage) || 1;
  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredOrders.slice(start, start + rowsPerPage);
  }, [filteredOrders, page, rowsPerPage]);

  // Reset page if filter changes
  useEffect(() => { setPage(1); }, [search, rowsPerPage]);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-6">تحليلات الطلبات</h1>

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

      {/* Status Breakdown Chart */}
      <Card>
        <CardContent className="py-6">
          <div className="mb-4 text-lg font-semibold">توزيع حالات الطلبات</div>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {statusChartData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={STATUS_COLORS[idx % STATUS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Order Trends Chart */}
      <Card>
        <CardContent className="py-6">
          <div className="mb-4 text-lg font-semibold">اتجاه الطلبات والإيرادات (يومي)</div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="orders" stroke="#2563eb" name="عدد الطلبات" />
                <Line type="monotone" dataKey="revenue" stroke="#22c55e" name="الإيرادات (ر.س)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Products Chart */}
      <Card>
        <CardContent className="py-6">
          <div className="mb-4 text-lg font-semibold">أفضل المنتجات (حسب الكمية)</div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-25} textAnchor="end" height={60} interval={0} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#38bdf8" name="الكمية" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table Controls */}
      <Card className="mb-2">
        <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 py-2">
          <div className="flex items-center gap-2">
            <label className="font-medium">بحث:</label>
            <Input
              className="w-40"
              type="text"
              placeholder="رقم الطلب أو اسم العميل"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-medium">عدد الصفوف:</label>
            <select
              className="border rounded px-2 py-1"
              value={rowsPerPage}
              onChange={e => setRowsPerPage(Number(e.target.value))}
            >
              {[10, 20, 50, 100].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent className="overflow-x-auto py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>رقم الطلب</TableHead>
                <TableHead>العميل</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>تاريخ الطلب</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell>{o.orderNumber ?? o.id}</TableCell>
                  <TableCell>{o.customer?.name ?? '-'}</TableCell>
                  <TableCell>{o.status}</TableCell>
                  <TableCell>{Number(o.amount).toLocaleString('ar-EG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ر.س</TableCell>
                  <TableCell>{new Date(o.createdAt).toLocaleDateString('ar-EG')}</TableCell>
                </TableRow>
              ))}
              {paginatedOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-400">لا توجد بيانات</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-2">
        <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
          السابق
        </Button>
        <span className="mx-2">صفحة {page} من {totalPages}</span>
        <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          التالي
        </Button>
      </div>
    </div>
  );
}
